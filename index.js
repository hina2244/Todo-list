#! /usr/bin/env node
import inquirer from "inquirer";
let todoList = [];
let conditions = true;
while (conditions) {
    let answer = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "Select an operation",
            choices: [
                "Add", "Update", "View",
                "Delete", "Exit",
            ]
        },
    ]);
    if (answer.select === "Add") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add items in the list",
            validate: function (input) {
                if (input.trim() == "") {
                    return "Please enter a non-empty items.";
                }
                return true;
            }
        });
        if (addTodo.todo.trim() !== "") {
            todoList.push(addTodo.todo);
            todoList.forEach(todo => console.log(todo));
        }
    }
    ;
    if (answer.select === "Update") {
        let UpdateTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "Update items in the list",
            choices: todoList.map(item => item)
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add items in the list",
        });
        let newTodo = todoList.filter(val => val !== UpdateTodo.todo);
        todoList = [...newTodo, addTodo.todo];
        todoList.forEach(todo => console.log(todo));
    }
    ;
    if (answer.select === "View") {
        console.log("****** TO-DO LIST ******");
        todoList.forEach(todo => console.log(todo));
    }
    ;
    if (answer.select === "Delete") {
        let deleteTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "Select items to delete",
            choices: todoList.map(item => item)
        });
        let newTodo = todoList.filter(val => val !== deleteTodo.todo);
        todoList = [...newTodo];
        todoList.forEach(todo => console.log(todo));
    }
    ;
    if (answer.select === "Exit") {
        console.log("Exiting program...");
        conditions = false;
    }
}
;
