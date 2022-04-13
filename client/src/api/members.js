
const getMembers = async () => {
    let response = await fetch('api/members');
    if (response.ok) { 
        let members = await response.json();
        return { error: false, data: members};
    } else {
        return {error: true, errorMessage: response.statusText};
    }
};

export { getMembers };