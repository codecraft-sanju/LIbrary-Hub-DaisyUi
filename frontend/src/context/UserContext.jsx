import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Register User
    async function registerUser(name, email, password, mobileNumber, dateOfBirth, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/register", {
                name,
                email,
                password,
                mobileNumber,
                dateOfBirth,
            });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Login User
    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/login", { email, password });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Fetch Logged-In User
    async function fetchUser() {
        try {
            const { data } = await axios.get("/api/user/me");
            setUser(data);
            setIsAuth(true);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchAllUsers();
    }, []);

    // Fetch All Users (Admin Only)
    async function fetchAllUsers() {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/api/user/users");
            setAllUsers(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch all users:", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Logout
    async function logout() {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/logout");
            toast.success(data.message || "User Logout successfully!");
            setUser(null);
            setIsAuth(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Edit Profile
    // Edit Profile
async function editProfile({ role, userId, name, email, mobileNumber, dateOfBirth }) {
    setBtnLoading(true);
    try {
        // Only admins can update user roles
        if (role && user?.role !== 'admin') {
            toast.error("Only admins can update user roles.");
            return;
        }

        const { data } = await axios.patch(`/api/user/users/${userId}`, {
            name,
            email,
            mobileNumber,
            dateOfBirth,
            role
        });

        toast.success(data.message);

        // Update the user's state after profile change
        if (data.user._id === user?._id) {
            setUser({
                ...user,
                name: data.user.name,
                email: data.user.email,
                mobileNumber: data.user.mobileNumber,
                dateOfBirth: data.user.dateOfBirth,
                role: data.user.role
            });
        }

        // If you're updating another user's profile (as admin), update the allUsers state
        setAllUsers(prev => prev.map(u => (u._id === userId ? data.user : u)));
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
        setBtnLoading(false);
    }
}




    // **Delete User (Admin Only)**
    async function deleteUser(userId) {
        setBtnLoading(true);
        try {
            const { data } = await axios.delete(`/api/user/users/${userId}`);
            toast.success(data.message);

            setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete user.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Forgot Password
    async function forgotPassword(email) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/forgotpassword", { email });
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send password reset email.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Reset Passwor
    async function resetPassword(token, newPassword, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.put(`/api/user/resetpassword/${token}`, { password: newPassword });
            toast.success(data.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Password reset failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    return (
        <UserContext.Provider
            value={{
                registerUser,
                loginUser,
                logout,
                fetchAllUsers,
                deleteUser,
                forgotPassword,
                resetPassword,
                btnLoading,
                isAuth,
                user,
                allUsers,
                loading,
                isLoading,
                editProfile,
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
