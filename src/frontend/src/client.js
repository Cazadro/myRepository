import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllStudents = () =>
    fetch("api/v1/students")
        .then(checkStatus);

export const addNewStudent = student =>
    fetch("api/v1/students/register", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student) // эта штука передается в аннотацию @RequestBody
    }).then(checkStatus);

export const removeStudent = student =>
    fetch("api/v1/students/delete", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify(student.id)
        }
    ).then(checkStatus);
