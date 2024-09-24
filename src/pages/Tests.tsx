import React from "react";

const Tests = () => {
  const loggedInUsername: string = "Oby";

  const users = [
    { name: "Oby", age: 12 },
    { name: "Heera", age: 32 },
  ];

  const loggedInUser = users.find((u) => u.name === loggedInUsername);
  console.log(loggedInUser?.age);
  const message = "Hello World!";
  console.log();
  console.log(message.toLowerCase());
  return <div className="flex flex-col items-center">Tests</div>;
};

export default Tests;
