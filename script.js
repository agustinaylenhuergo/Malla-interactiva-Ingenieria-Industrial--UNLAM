document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course');
    const approvedCourses = new Set();

    // Function to check if all correlatives for a course are approved
    const checkCorrelatives = (correlatives) => {
        if (!correlatives) return true;
        const requiredCourses = correlatives.split('/').map(c => c.trim());
        return requiredCourses.every(req => approvedCourses.has(req));
    };

    // Function to update the state of all courses
    const updateCourseStates = () => {
        courses.forEach(course => {
            const courseId = course.id;
            const correlatives = course.dataset.correlative;

            if (approvedCourses.has(courseId)) {
                course.classList.add('approved');
                course.classList.remove('disabled');
            } else {
                course.classList.remove('approved');
                if (checkCorrelatives(correlatives)) {
                    course.classList.remove('disabled');
                } else {
                    course.classList.add('disabled');
                }
            }
        });
    };

    // Add click event listener to each course
    courses.forEach(course => {
        course.addEventListener('click', () => {
            const courseId = course.id;
            const correlatives = course.dataset.correlative;

            if (!approvedCourses.has(courseId)) { // If not already approved
                if (checkCorrelatives(correlatives)) {
                    approvedCourses.add(courseId);
                    updateCourseStates();
                } else {
                    alert('¡No puedes aprobar esta materia! Primero debes aprobar sus correlativas.');
                }
            } else {
                // Optional: Allow un-approving for testing, or just do nothing
                // approvedCourses.delete(courseId);
                // updateCourseStates();
                alert('Esta materia ya está aprobada.');
            }
        });
    });

    // Initial state update
    updateCourseStates();
});
