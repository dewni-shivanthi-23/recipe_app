const UserRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "user") return <Navigate to="/login" />;

  return children;
};

export default UserRoute;
