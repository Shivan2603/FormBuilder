using System.ComponentModel.DataAnnotations;

public class FormModel
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    public string Description { get; set; }
    
    public List<FormElement> Elements { get; set; } // New property for form elements
}

public class FormElement
{
    public string Type { get; set; }
    public string Label { get; set; }
    public string Placeholder { get; set; }
    public string Value { get; set; } // Add this line
    public bool IsRequired { get; set; }
    public string ValidationRule { get; set; }
    public bool IsVisible { get; set; } = true;
}