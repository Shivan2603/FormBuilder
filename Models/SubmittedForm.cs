using System;
using System.Collections.Generic;
<<<<<<< HEAD
using System.Text.Json.Serialization;
=======
>>>>>>> 34604b3fb1b44440c4f15b94ba0ee5e9b4d8f434

namespace FormBuilderApp.Models
{
    public class FormElement
    {
        public int Id { get; set; }
        public string Type { get; set; }
<<<<<<< HEAD
        public string Label { get; set; }
        public string? Placeholder { get; set; }
        public List<string>? Options { get; set; }
=======
        
        public string Label { get; set; }
        public string? Placeholder { get; set; }
        public List<string>? Options { get; set; }  
        // Remove IsRequired and ValidationRule properties
>>>>>>> 34604b3fb1b44440c4f15b94ba0ee5e9b4d8f434
    }

    public class SubmittedForm
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime SubmissionDate { get; set; }
<<<<<<< HEAD

        [JsonIgnore] // Exclude this from JSON serialization to avoid circular references
        public List<FormElement> Elements { get; set; } = new List<FormElement>();

        public string FormData { get; set; } // Store the entire form as JSON
=======
        public List<FormElement> Elements { get; set; } = new List<FormElement>();
        public string? SubmittedData { get; set; } // New property to store form data as JSON

>>>>>>> 34604b3fb1b44440c4f15b94ba0ee5e9b4d8f434
    }
}
