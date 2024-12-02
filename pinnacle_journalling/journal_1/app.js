document.getElementById('journal-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const entryText = document.getElementById('entry').value;
    const entryList = document.getElementById('entry-list');

    const listItem = document.createElement('li');
    listItem.textContent = entryText;
    entryList.appendChild(listItem);

    document.getElementById('entry').value = ''; // Clear the textarea
});