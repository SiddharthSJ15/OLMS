function StudentLogout() {
    localStorage.removeItem('studentLoginStatus')
    window.location.href='/user-login'
    return (
        <div>
        </div>
    );
    
}

export default StudentLogout;