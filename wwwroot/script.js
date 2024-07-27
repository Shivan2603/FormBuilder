document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

const formCanvas = document.getElementById('formCanvas');
let editingElement = null; // To track the currently edited element

formCanvas.addEventListener('dragover', dragOver);
formCanvas.addEventListener('drop', drop);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
}

function dragOver(e) {
    e.preventDefault(); // Prevent default to allow drop
}

function drop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    
    if (type === 'checkbox' || type === 'radio') {
        const groupName = prompt("Enter group name for checkboxes/radio buttons:", "Group Name");
        if (!groupName) return; // Exit if no group name is provided
        addMultipleElements(type, groupName);
    } else if (type === 'select') {
        const groupName = prompt("Enter group name for the dropdown:", "Dropdown Name");
        if (!groupName) return; // Exit if no group name is provided
        addDropdown(groupName);
    } else {
        const labelText = prompt("Enter label for the element:", "Label");
        const container = document.createElement('div');
        container.classList.add('form-element-container'); // Create a container for the element

        const label = document.createElement('label');
        label.textContent = labelText;

        const element = addElementToForm(type);
        container.appendChild(label);
        container.appendChild(element);

        // Associate the label with the element
        label.setAttribute('for', element.id);
        addEditAndDeleteButtons(container, label, element); // Add edit and delete buttons for labels

        formCanvas.appendChild(container); // Append the container to the form canvas
    }
}

function addMultipleElements(type, groupName) {
    const groupContainer = document.createElement('div');
    groupContainer.classList.add('group-container'); // Create a container for the group

    // Create a header for the group
    const groupHeader = document.createElement('h3');
    groupHeader.textContent = groupName;

    // Create a button container for edit and delete buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Edit Button for Group
    const editGroupButton = document.createElement('button');
    editGroupButton.textContent = '✏️'; // Edit icon
    editGroupButton.classList.add('icon-button', 'edit'); // Add specific class for edit

    editGroupButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the label click event
        const newGroupName = prompt("Edit group name:", groupHeader.textContent);
        if (newGroupName !== null) {
            groupHeader.textContent = newGroupName; // Update group header
        }
    });

    // Delete Button for Group
    const deleteGroupButton = document.createElement('button');
    deleteGroupButton.textContent = '🗑️'; // Delete icon
    deleteGroupButton.classList.add('icon-button', 'delete'); // Add specific class for delete

    deleteGroupButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the label click event
        groupContainer.remove(); // Remove the entire group container
    });

    // Append buttons to the button container
    buttonContainer.appendChild(editGroupButton);
    buttonContainer.appendChild(deleteGroupButton);

    // Append group header and button container to the group container
    groupContainer.appendChild(groupHeader);
    groupContainer.appendChild(buttonContainer);

    // Append the group container to the form canvas
    formCanvas.appendChild(groupContainer);

    let count = parseInt(prompt("How many elements do you want to add?", "1"), 10);
    if (isNaN(count) || count < 1) return; // Exit if invalid count is provided

    for (let i = 0; i < count; i++) {
        const container = document.createElement('div');
        container.classList.add('form-element-container'); // Create a container for the element

        const label = document.createElement('label');
        label.textContent = `${groupName} ${i + 1}`; // Label for individual checkbox/radio

        const element = addElementToForm(type);
        element.name = groupName; // Set the group name for radio buttons
        container.appendChild(label);
        container.appendChild(element);

        // Associate the label with the element
        label.setAttribute('for', element.id);
        addEditAndDeleteButtons(container, label, element); // Add edit and delete buttons for labels

        groupContainer.appendChild(container); // Append the container to the group container
    }
}

function addDropdown(groupName) {
    const groupContainer = document.createElement('div');
    groupContainer.classList.add('group-container'); // Create a container for the group

    // Create a header for the group
    const groupHeader = document.createElement('h3');
    groupHeader.textContent = groupName;

    // Create a button container for edit and delete buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Edit Button for Group
    const editGroupButton = document.createElement('button');
    editGroupButton.textContent = '✏️'; // Edit icon
    editGroupButton.classList.add('icon-button', 'edit'); // Add specific class for edit

    editGroupButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the label click event
        const newGroupName = prompt("Edit group name:", groupHeader.textContent);
        if (newGroupName !== null) {
            groupHeader.textContent = newGroupName; // Update group header
        }
    });

    // Delete Button for Group
    const deleteGroupButton = document.createElement('button');
    deleteGroupButton.textContent = '🗑️'; // Delete icon
    deleteGroupButton.classList.add('icon-button', 'delete'); // Add specific class for delete

    deleteGroupButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the label click event
        groupContainer.remove(); // Remove the entire group container
    });

    // Append buttons to the button container
    buttonContainer.appendChild(editGroupButton);
    buttonContainer.appendChild(deleteGroupButton);

    // Append group header and button container to the group container
    groupContainer.appendChild(groupHeader);
    groupContainer.appendChild(buttonContainer);

    // Create the dropdown element
    const dropdown = document.createElement('select');
    dropdown.classList.add('form-element');

    // Set a fixed width for the dropdown
    dropdown.style.width = '200px'; // Set a fixed width for the dropdown

    // Add options to the dropdown
    let optionCount = parseInt(prompt("How many options do you want to add to the dropdown?", "1"), 10);
    if (isNaN(optionCount) || optionCount < 1) return; // Exit if invalid count is provided

    for (let i = 0; i < optionCount; i++) {
        const optionText = prompt(`Enter text for option ${i + 1}:`, `Option ${i + 1}`);
        const option = document.createElement('option');
        option.textContent = optionText || `Option ${i + 1}`; // Default text if none provided
        dropdown.appendChild(option);
    }

    groupContainer.appendChild(groupHeader);
    groupContainer.appendChild(buttonContainer);
    groupContainer.appendChild(dropdown); // Append the dropdown to the group container

    // Append the group container to the form canvas
    formCanvas.appendChild(groupContainer);
}

function addElementToForm(type) {
    let element;
    switch (type) {
        case 'text':
            element = document.createElement('input');
            element.type = 'text';
            element.placeholder = 'Enter text';
            break;
        case 'textarea':
            element = document.createElement('textarea');
            element.placeholder = 'Enter text';
            break;
        case 'number':
            element = document.createElement('input');
            element.type = 'number';
            element.placeholder = 'Enter number';
            break;
        case 'date':
            element = document.createElement('input');
            element.type = 'date';
            break;
        case 'checkbox':
            element = document.createElement('input');
            element.type = 'checkbox';
            element.classList.add('checkbox-element'); // Add a class for checkboxes
            element.id = `element-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique ID
            break;
        case 'radio':
            element = document.createElement('input');
            element.type = 'radio';
            element.id = `element-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique ID
            break;
        case 'select':
            element = document.createElement('select');
            const option = document.createElement('option');
            option.textContent = 'Select an option';
            element.appendChild(option);
            break;
        case 'file':
            element = document.createElement('input');
            element.type = 'file';
            break;
        case 'email':
            element = document.createElement('input');
            element.type = 'email';
            element.placeholder = 'Enter email';
            break;
        case 'phone':
            element = document.createElement('input');
            element.type = 'tel';
            element.placeholder = 'Enter phone number';
            break;
        case 'url':
            element = document.createElement('input');
            element.type = 'url';
            element.placeholder = 'Enter URL';
            break;
        case 'color':
            element = document.createElement('input');
            element.type = 'color';
            break;
        case 'range':
            element = document.createElement('input');
            element.type = 'range';
            break;
        default:
            return;
    }

    element.classList.add('form-element');
    return element;
}

// Function to add edit and delete buttons for labels
function addEditAndDeleteButtons(container, label, element) {
    // Create a button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Edit Button
    const editButton = document.createElement('button');
    editButton.textContent = '✏️'; // You can replace this with an actual icon if desired
    editButton.classList.add('icon-button', 'edit'); // Add specific class for edit

    editButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the label click event
        const newLabel = prompt("Edit label:", label.textContent);
        if (newLabel !== null) {
            label.textContent = newLabel; // Update label
            label.setAttribute('for', element.id); // Reassociate label with element
        }
    });

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️'; // You can replace this with an actual icon if desired
    deleteButton.classList.add('icon-button', 'delete'); // Add specific class for delete

    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the label click event
        container.remove(); // Remove the entire container
    });

    // Append buttons to the button container
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    container.appendChild(buttonContainer); // Append button container to the main container
}

// Fetch existing forms from the API
async function fetchForms() {
    const response = await fetch('/api/form');
    if (response.ok) {
        const forms = await response.json();
        forms.forEach(form => {
            console.log(form);
        });
    } else {
        console.error('Failed to fetch forms:', response.status);
    }
}

// Save the form to the API
async function saveForm(formData) {
    const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if (response.ok) {
        const savedForm = await response.json();
        console.log('Form saved:', savedForm);
    } else {
        console.error('Failed to save form:', response.status);
    }
}

// Handle save button click
document.getElementById('saveButton').addEventListener('click', () => {
    const formElements = Array.from(formCanvas.children).filter(child => child.tagName === 'DIV').map(container => {
        const label = container.querySelector('label');
        const element = container.querySelector('.form-element');
        return {
            type: element.tagName.toLowerCase(),
            label: label.textContent,
            placeholder: element.placeholder || '',
            checked: element.checked || false,
            name: element.name || '' // Capture name for radio buttons
        };
    });
    saveForm({ elements: formElements });
});

// Handle submit button click
document.getElementById('submitButton').addEventListener('click', () => {
    const formData = Array.from(formCanvas.children).filter(child => child.tagName === 'DIV').map(container => {
        const label = container.querySelector('label');
        const element = container.querySelector('.form-element');
        return {
            type: element.tagName.toLowerCase(),
            value: element.value || (element.checked ? true : false) // Capture value for checkboxes
        };
    });
    console.log('Form submitted with data:', formData);
    // Here you can send the form data to your backend for processing
});

async function submitForm() {
    const formElements = Array.from(formCanvas.children).filter(child => child.tagName === 'DIV').map(container => {
        const element = container.querySelector('.form-element');
        return {
            type: element.tagName.toLowerCase(),
            value: element.value || (element.checked ? true : false)
        };
    });
    const response = await fetch('/api/form/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formElements)
    });
    if (response.ok) {
        console.log('Form submitted successfully');
    } else {
        console.error('Failed to submit form:', response.status);
    }
}

document.getElementById('submitButton').addEventListener('click', submitForm);
