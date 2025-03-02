import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./UserProfileForm.css";

interface UserProfile {
  name: string;
  email: string;
  password: string;
}

const UserProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit: SubmitHandler<UserProfile> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null); // Clear any previous success message
    try {
      const response = await fetch(`/api/users/1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Server error");
      const result = await response.json();
      console.log("API response:", result);
      setSuccess("Profile updated successfully!"); // Show success in DOM
      setTimeout(() => setSuccess(null), 3000); // Clear message after 3 seconds
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      alert("Failed to update profile. Check console."); // Keep alert for errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-profile-form">
      <h2>Update Profile</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            type="text"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
