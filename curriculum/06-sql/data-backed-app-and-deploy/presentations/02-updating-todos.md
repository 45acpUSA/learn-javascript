# Updating Todos

Now that we have Todos displaying on the Todo List detail page, we'd like to be able to check them off as complete when we finish them.  Putting this in Agile terms, we're going to work on the following user stories:

* As a user, I want to see the status of my todo items.
* As a user, I want to be able to mark completed todos.

This is the design of the app that we are working towards.
![todo 4]()

## Add a route to update Todos
We need to add a route that looks up a todo based on a passed ID, and updates its ```.isComplete``` flag to true when the user clicked the 'done' button.  We'll use a form in the HTML to accomplish this, so the route needs to accept POST requests.

#### ./app.js
```Javascript
app.post('/todo-list/:todoListId/todo/:id/complete', function(request, response){
  Todo.findById(request.params.id).then(function(todo){
    todo.isComplete = true
    return todo.save()
  }).then(function(todo){
    response.redirect("/todo-list/" + request.params.todoListId)
  }).catch(function(error){
    response.send("Error, couldn't fetch Todo")
  })
})
```

## Add a form to update Todos
On the front end, we'll need a form for the user to interact with, and some logic to display each todo item correctly determined by if the todo item is complete or not.

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
        <span class='complete' >
          <%= todos[index].name %>
        </span>
      <% } %>
    </li>
  <% } %>
</ul>
```

## Adding a stylesheet

We want completed todos to be green, and have a line through them indicating they are complete.  We handle this by adding some CSS rules to complete todos.  Recall that in ```.app.js```, we setup a 'public' directory to serve static files.  

```Javascript
app.use(express.static('public'))
```
This is where we'll put our stylesheet.

#### ./public/css/todos.css
```CSS
.complete{
  text-decoration: line-through;
  color: green;
}
```

And we add it to the layout.
#### ./views/layout.ejs
```HTML
  <head>
    <link rel='stylesheet' href='/css/todos.css' />
  <head>
```

So there we have it, we can now mark our todos off as we complete them.

![todo 4]()
