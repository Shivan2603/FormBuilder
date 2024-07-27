public class SubmittedForm
{
    public int Id { get; set; }
    public DateTime SubmissionDate { get; set; }
    public List<FormElement> Elements { get; set; } // Store the submitted elements
}