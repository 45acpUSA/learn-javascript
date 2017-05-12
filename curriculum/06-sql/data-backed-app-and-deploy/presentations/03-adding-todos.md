# Adding todos

Our todo list is likely to grow as time goes on, so we want the ability to add new todo items to the list.  In order to accomplish this, we'll add another route to the application, and a new form to the Todo List page.

This is the design we are shooting for

![todo 5](https://s3.amazonaws.com/learn-site/curriculum/todo-list/todo-5.png)

## Add the route

#### ./app.js
```Javascript
app.post('/todo-list/:todoListId/todo/new', function(request, response){
  TodoList.findById(request.params.todoListId).then(function(todoList){
    return todoList.createTodo({
      name: request.body.name,
      isComplete: false
    })
  }).then(function(todo){
    response.redirect("/todo-list/" + request.params.todoListId)
  }).catch(function(error){
    response.send("Error, couldn't create Todo")
  })
})
```

## Add the Markup
And we add the new for to the bottom of the todo list page

#### ./views/todo-list.ejs
```HTML
<div>
  <h3>New Todo</h3>
  <form
    action="/todo-list/<%= todoList.get('id') %>/todo/new"
    method="post"
  >
    <input type='text' name='name' />
    <input type='submit' value='Add Todo' />
  </form>
</div>
```

## Completed Story
You can see the complete application at this stage [here](https://github.com/notch8/learn-javascript-examples/tree/06-sql_express-full-stack_add-todos/06-sql/express-full-stack)

Once these are in place, we've added the ability to create new Todo items in our list, and completed this story:

* As a User, I want to be able to add more items to a todo list.

![todo 6](https://s3.amazonaws.com/learn-site/curriculum/todo-list/todo-6.png)



## Never nest forms
There are quite a few forms included in this page now.  This is perfectly ok, as long as we keep one rule in mind.  Never nest a form inside of another form.  Browsers can't handle nested forms, and will be confused about what inputs belong to what form, and where to submit to.


### Don't do this
```HTML
<form action="/some/action" method="post">
  <!-- Some markup -->
  <form action="/some/other/action" method="post"
    <!-- Some markup -->
  </form>
</form>
```
