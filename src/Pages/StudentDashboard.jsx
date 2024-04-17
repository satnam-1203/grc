useEffect(() => {
    Axios.get(`${API_URL}/getLoggedInStudentData`, { withCredentials: true })
        .then(response => {
            if (response.data.stuloggedIn === true) {
                console.log("ok");
            } else {
                navigate('/');
            }
        })
        .catch(error => {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
                console.error('Status code:', error.response.status);
                // Handle 401 error specifically
                if (error.response.status === 401) {
                    console.error('Unauthorized: Please check your authentication credentials.');
                    // Redirect to login or home page as appropriate
                    navigate('/');
                }
            } else if (error.request) {
                console.error('No response received from server:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
            navigate('/');
        });
}, [navigate]);
