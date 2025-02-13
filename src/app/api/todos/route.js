 import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';


export const GET = async () => {
  try {
        const todos = await prisma.todo.findMany();
        return NextResponse.json(todos);

  } catch (error) {
    return NextResponse.json({ message: "Error fetching todos", error }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
        const { title } = await req.json();
        if (!title) return NextResponse.json({ message: "Title is required" }, { status: 400 });

        const newTodo = await prisma.todo.create({ 
          data: { 
                title,
         } });

        return NextResponse.json(newTodo);
  } catch (error) {

    return NextResponse.json({ message: "Error adding todo", error }, { status: 500 });
  }
};

export const PUT = async (req) => {
  try {
        const { id } = await req.json();

        const updatedTodo = await prisma.todo.update({
          where: { id },
        });

    return NextResponse.json(updatedTodo);

  } catch (error) {
    return NextResponse.json({ message: "Error updating todo", error }, { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
        const { id } = await req.json();

        await prisma.todo.delete({ where: { id } });
        
        return NextResponse.json({ message: "Todo deleted" });

  } catch (error) {
    return NextResponse.json({ message: "Error deleting todo", error }, { status: 500 });
  }
};
