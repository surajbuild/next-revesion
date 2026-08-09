import todos from "@/todos.json";
import { connectDB } from "@/lib/connectDB";
import { cookies } from "next/headers";

import Todo from "@/models/todoModel";
import toast from "react-hot-toast";
import { isLoggedIn } from "@/lib/auth";

export async function GET(request: Request) {
  await connectDB();
  const user = await isLoggedIn();
  console.log('user', user)

  if(user instanceof Response) {
    return user;
  }

  const allTodos = await Todo.find({userId: user._id});
  console.log("allTodos", allTodos);

  console.log("--------------------------------------");

  //FOR learning cookies
  // const response = new Response(JSON.stringify([]),{
  //     headers: {
  //         // 'Content-Type': 'application/json',
  //         "Set-Cookie" : "name=amanCookies; httpOnly; path=/"
  //     }
  // })
  // return response;
  // const cookieStore = await cookies();

  // cookieStore.set("name", "aman", { httpOnly: true, maxAge: 5 }); //setting a cookie

  // const theme = cookieStore.getAll();

  // console.log("name", theme);

  return Response.json(
    allTodos.map(({ id, title, completed }) => ({ id, title, completed })),
  );
}

export async function POST(request: Request) {
  await connectDB();

  const user = await isLoggedIn();
  if(user instanceof Response) {
    return user;
  }

  const todo = await request.json();
  console.log("todo", todo);

  const { id, title, completed } = await Todo.create({
    title: todo.title,
    userId: user._id,
  });

  return Response.json(
    { id, title, completed},
    {
      status: 201,
    },
  );
}
