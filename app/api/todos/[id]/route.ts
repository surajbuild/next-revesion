import { connectDB } from "@/lib/connectDB";
import Todo from "@/models/todoModel";
import { isLoggedIn } from "@/lib/auth";

export async function GET(request: Request, { params }: {params: Promise<{id: string}>}) {
  await connectDB();
  const { id } = await params;
  console.log('id', id);

  const user = await isLoggedIn();
  if(user instanceof Response) {
    return user;
  }

  const todo = await Todo.findOne({_id: id, userId: user.id});
  console.log('todo', todo);

  if (!todo) {
    return Response.json(
      {
        error: "todo not found",
      },
      { status: 404 },
    );
  }

  return Response.json(todo);
}


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const user = await isLoggedIn();
  if(user instanceof Response) {
    return user;
  }

  const body = await request.json();
  console.log(body);

  const { id } = await params;

  const updatedTodo = await Todo.updateMany({_id: id, userId: user.id},
    body, { new: true }); 

  return Response.json(updatedTodo);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  console.log("Delete called");
  console.log("request", await params);
  await connectDB();

  const user = await isLoggedIn();
  if(user instanceof Response) {
    return user;
  }

  const { id } = await params;
  console.log(id);
  // const todo = todos.findIndex((todo) => todo.id === id);
  const todo = await Todo.deleteOne({_id: id, userId: user.id});
  console.log("todo", todo);
  // console.log(todos[])

  // if (!todos) {
  //   return Response.json(
  //     {
  //       error: "todo not found",
  //     },
  //     { status: 404 },
  //   );
  // }
  // console.log(todo);
  // console.log(todos);
  // todos.splice(todo, 1);
  // console.log(todos);
  // await writeFile("./todos.json", JSON.stringify(todos, null, 2));
  return Response.json(todo);
}
