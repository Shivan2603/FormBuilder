using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Text;

namespace FormBuilderApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly FormContext _context;

        public FormController(FormContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormModel>>> GetForms()
        {
            return await _context.Forms.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FormModel>> GetForm(int id)
        {
            var form = await _context.Forms.FindAsync(id);
            if (form == null)
            {
                return NotFound();
            }
            return form;
        }

        [HttpPost]
        public async Task<ActionResult<FormModel>> PostForm(FormModel formModel)
        {
            _context.Forms.Add(formModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetForm), new { id = formModel.Id }, formModel);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutForm(int id, FormModel formModel)
        {
            if (id != formModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(formModel).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForm(int id)
        {
            var form = await _context.Forms.FindAsync(id);
            if (form == null)
            {
                return NotFound();
            }

            _context.Forms.Remove(form);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitForm([FromBody] List<FormElement> formElements)
        {
            // Validate the form elements
            var validationResults = new List<ValidationResult>();
            var isValid = true;

            foreach (var element in formElements)
            {
                var elementErrors = new List<string>();
                if (!ValidateFormElement(element, out elementErrors))
                {
                    isValid = false;
                    validationResults.Add(new ValidationResult(string.Join(", ", elementErrors), new[] { element.Label }));
                }
            }

            if (!isValid)
            {
                return BadRequest(validationResults); // Return validation errors
            }

            // Save submitted data to the database
            var submittedForm = new SubmittedForm
            {
                SubmissionDate = DateTime.UtcNow,
                Elements = formElements // Assuming you have a way to serialize this
            };

            _context.SubmittedForms.Add(submittedForm);
            await _context.SaveChangesAsync();

            // Send notifications (e.g., email)
            await SendNotification(submittedForm);

            return Ok(new { message = "Form submitted successfully", formId = submittedForm.Id });
        }


        private bool ValidateFormElement(FormElement element, out List<string> errors)
        {
            errors = new List<string>();

            if (element.IsRequired && string.IsNullOrWhiteSpace(element.Value))
            {
                errors.Add($"{element.Label} is required.");
            }

            if (!string.IsNullOrWhiteSpace(element.ValidationRule))
            {
                // Implement specific validation rules
                if (element.ValidationRule == "email" && !IsValidEmail(element.Value))
                {
                    errors.Add($"{element.Label} must be a valid email address.");
                }
                // Add more validation rules as needed
            }

            return errors.Count == 0;
        }

        private bool IsValidEmail(string email)
        {
            // Simple email validation logic
            return Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        }

        private async Task SendNotification(SubmittedForm submittedForm)
        {
            var emailService = new EmailService(); // Use the EmailService defined below
            var emailContent = GenerateEmailContent(submittedForm);

            await emailService.SendEmailAsync("recipient@example.com", "New Form Submission", emailContent);
        }

        private string GenerateEmailContent(SubmittedForm submittedForm)
        {
            // Create a formatted string or HTML for the email content
            var sb = new StringBuilder();
            sb.AppendLine("New form submission received:");
            foreach (var element in submittedForm.Elements)
            {
                sb.AppendLine($"{element.Label}: {element.Value}");
            }
            return sb.ToString();
        }

        // Email Service Implementation
        private class EmailService
        {
            private readonly string _smtpServer = "smtp.your-email-provider.com"; // Replace with your SMTP server
            private readonly int _smtpPort = 587; // Replace with your SMTP port
            private readonly string _smtpUser = "your-email@example.com"; // Replace with your email
            private readonly string _smtpPass = "your-email-password"; // Replace with your email password

            public async Task SendEmailAsync(string to, string subject, string body)
            {
                using (var client = new SmtpClient(_smtpServer, _smtpPort))
                {
                    client.Credentials = new NetworkCredential(_smtpUser, _smtpPass);
                    client.EnableSsl = true;

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(_smtpUser),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true // Set to true if you're sending HTML content
                    };

                    mailMessage.To.Add(to);

                    await client.SendMailAsync(mailMessage);
                }
            }
        }
    }
}