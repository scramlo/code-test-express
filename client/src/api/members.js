
const getMembers = async () => {
    try {
        let response = await fetch('http://localhost:3000/api/members');
        let members = await response.json();
        return { error: false, data: members };
    } catch (error) {
        return { error: true, errorMessage: error || 'Something went wrong' };
    }
};

export { getMembers };