# One to One Relationships

Our data model tells us that us_states have a governor, and the id for the relation is stored on the 'us_state' table as 'governorId'.  This is a one-to-one relationship.  A state can only have one governor, and a person can only be governor of one state at a time.

>  A little trivia.  Only one person in the history of the United States has ever been governor of 2 different states.  Sam Houston.  Do you know what two states?  Keep reading to find the answer.

## hasOne vs. belongsTo

When defining one to one relationships, we have two choices on how to go about it, and the distinction between the two is what table the foreign key resides in.

When we declare that ```TableA.belongsTo(TableB)``` we're stating that the foreign key will be assigned to TableA.

If we were to declare ```TableA.hasOne(TableB)```, then the foreign key would reside on TableB.

In our case of states and people, we want the foreign key to reside on the ```us_states``` table, so we use ```UsState.belongsTo(Person)```

![has one vs belongs to](https://s3.amazonaws.com/learn-site/curriculum/has_one_vs_belongs_to.png)

## Setting up a belongsTo relationship

Notice that we want the foreign key on us_states to be called ```governorId```.  We'll need to tell Sequelize about that when we setup the relationship.  Here's how to set it up:

```Javascript
```

### One to Many

## Accessing Relationships

> Sam Houston
>
> He was an extrordinary man, instrumental in the formation of the republic, and eventually state of Texas, where he was the first governor.  Sam rose to political power first in Tenessee though, being elected governor ther in 1827.  His first governorship didn't go as expected however, when he was run out of the state due to marital difficulties.  
>
> [Wikipedia](https://en.wikipedia.org/wiki/Sam_Houston)
