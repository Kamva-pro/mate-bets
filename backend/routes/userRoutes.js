useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Replace with your token storage mechanism
        const response = await axios.get('http://localhost:3000/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the request
          },
        });
        setUser(response.data); // Set the user data in the state
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null); // Clear the user if an error occurs
      }
    };
  
    fetchUser();
  }, []);
  