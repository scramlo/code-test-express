
const getMembers = async () => {
    let response = await fetch('http://localhost:3000/api/members');
    if (response.ok) { 
        let members = await response.json();
        return { error: false, data: members};
    } else {
        return {error: true, errorMessage: response.statusText};
    }
};

export { getMembers };