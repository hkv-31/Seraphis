document.addEventListener('DOMContentLoaded', () => {
    const moodButtons = document.querySelectorAll('.mood-button');
    const habitButtons = document.querySelectorAll('.habit-button');
    const customHabitInput = document.getElementById('custom-habit');
    const addHabitButton = document.getElementById('add-habit');
    const journalForm = document.getElementById('journal-form');
    const moodInput = document.getElementById('mood');
    const habitsInput = document.getElementById('habits');
    const entryList = document.getElementById('entry-list');

    let selectedHabits = [];

    // Handle mood selection
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            moodInput.value = button.getAttribute('data-value');
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected'); // Add selected class
        });
    });

    // Handle habit selection
    habitButtons.forEach(button => {
        button.addEventListener('click', () => {
            const habitValue = button.getAttribute('data-value');
            if (selectedHabits.includes(habitValue)) {
                selectedHabits = selectedHabits.filter(habit => habit !== habitValue);
                button.classList.remove('selected'); // Remove selected class
            } else {
                selectedHabits.push(habitValue);
                button.classList.add('selected'); // Add selected class
            }
            habitsInput.value = selectedHabits.join(', ');
        });
    });

    // Add custom habit
    addHabitButton.addEventListener('click', () => {
        const customHabit = customHabitInput.value.trim();
        if (customHabit && !selectedHabits.includes(customHabit)) {
            selectedHabits.push(customHabit);
            const newHabitButton = document.createElement('button');
            newHabitButton.textContent = customHabit;
            newHabitButton.classList.add('habit-button', 'custom-habit');
            newHabitButton.setAttribute('data-value', customHabit);
            newHabitButton.addEventListener('click', () => {
                selectedHabits = selectedHabits.filter(habit => habit !== customHabit);
                newHabitButton.remove();
                habitsInput.value = selectedHabits.join(', ');
            });
            document.getElementById('habit-options').appendChild(newHabitButton);
            customHabitInput.value = '';
            habitsInput.value = selectedHabits.join(', ');
        }
    });

    // Handle form submission
    journalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const mood = moodInput.value;
        const habits = habitsInput.value;
        const gratitude = document.getElementById('gratitude').value;
        const takeaway = document.getElementById('takeaway').value;

        const entry = document.createElement('li');
        entry.textContent = `${date} - Mood: ${mood}, Habits: ${habits}, Grateful for: ${gratitude}, Takeaways: ${takeaway}`;
        entryList.appendChild(entry);

        journalForm.reset();
        selectedHabits = [];
        habitsInput.value = '';
        moodButtons.forEach(btn => btn.classList.remove('selected'));
    });
});