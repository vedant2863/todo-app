import { Link } from "react-router-dom";

function Root() {
  const linkItem = [
    { name: "Go to Home", slug: "/" },
    { name: "Signin", slug: "/signin" },
    { name: "Signup", slug: "/signup" },
  ];

  return (
    <div className="bg-blue-200 py-40 cursor-default">
      <div className="text-center mb-4">
        <h1 className="text-7xl font-bold">Welcome to Todo App</h1>
      </div>

      <div className="text-center text-4xl m-4 p-4 antialiased">
        <p>Here You can see all your Todos</p>
        <p>You can also add new Todos</p>
        <p>You can also edit and delete Todos</p>
        <p>You can also mark Todos as completed</p>
      </div>

      <div className="flex justify-around ">
        {linkItem.map((item) => (
          <Link
            key={item.slug}
            to={item.slug}
            className="text-blue-700 hover:text-blue-900 cursor-pointer "
          >
            <p className="underline ">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Root;
