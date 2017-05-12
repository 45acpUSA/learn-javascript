# Deleting Todos

Our todo list could become quite long, and as we finish items on it, we may not want to keep those around.  We can keep the list tidy by allowing the user to delete completed items from the list.  The mechanics of doing this are very similar to updating a todo when it is complete, only this time, instead of updating, we delete the record from the database.

![todo 7](https://s3.amazonaws.com/learn-site/curriculum/todo-list/todo-7.png)

Like in our past two exercises, we'll need to add a new route to the application, and form to the page.

## Adding the Route

#### ./app.js
```Javascript
app.post('/todo-list/:todoListId/todo/:id/delete', function(request, response){
  Todo.findById(request.params.id).then(function(todo){
    return todo.destroy()
  }).then(function(todo){
    response.redirect("/todo-list/" + request.params.todoListId)
  }).catch(function(error){
    response.send("Error, couldn't fetch Todo")
  })
})
```

## Adding the Form

#### ./views/todo-list.ejs
```HTML
<h2><%= todoList.get('name') %></h2>

<ul>
  <% for(index in todos){ %>
    <li>
      <% if(!todos[index].isComplete){ %>
        <form
          action="/todo-list/<%= todoList.get('id') %>/todo/<%= todos[index].get('id') %>/complete"
          method="post"
        >
          <%= todos[index].name %>
          <input type='submit' value='done' />
        </form
      <% }else{ %>

        <!-- This is the new form to handle deletes -->
        <form
          action="/todo-list/<%= todoList.get('id') %>/todo/<%= todos[index].get('id') %>/delete"
          method="post"
        >
          <span class='complete' >
            <%= todos[index].name %>
          </span>
          <input type='submit' value='remove' />
        </form>
      <% } %>
    </li>
  <% } %>
</ul>
```

## Completed Story

With those two additions in place, we've completed this story:

* As a User, I want to be able to remove completed items from a todo list.
