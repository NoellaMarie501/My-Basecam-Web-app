//method to handle the chage in the state of a form
export const handleChange = (e, setState, state) => setState({...state, [e.target.name]: e.target.value});
