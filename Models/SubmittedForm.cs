using System;
using System.Collections.Generic;

namespace FormBuilderApp.Models
{
    public class FormElement
    {
        public int Id { get; set; }
        public string Type { get; set; }
        
        public string Label { get; set; }
        public string? Placeholder { get; set; }
        public List<string>? Options { get; set; }  
        // Remove IsRequired and ValidationRule properties
    }

    public class SubmittedForm
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime SubmissionDate { get; set; }
        public List<FormElement> Elements { get; set; } = new List<FormElement>();
        public string? SubmittedData { get; set; } // New property to store form data as JSON

    }
}
