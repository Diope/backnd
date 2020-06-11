# BACKND

So I've been copy pasting the entire backend stack that I created and used in [Drybbble](https://github.com/diope/drybbble) as I didn't want to redo it each time I wanted to mess around with an idea of sorts that needed authentication so I decided to create a boilerplate and rework the backend to better separate concerns and make it more modular. This backend can be used with any UI rendering layer at least that is my hope. This will make it easier for me (or anyone really) to get up and running fairly quickly. Obviously there are better and more robust solutions out there, but I made this as I'll know the ins and outs of it as I created it.

In its current implementation this boilerplate supports:
* MongoDB
* JWT
* Authentication with basic Authorization (you can define routes a user is authorized to visit)
* Error handling.

I must thank my friend [David](https://github.com/beetz12) who helped me with a few pain points, and understood what I wanted to do with my old code even when I wasn't great at verbally explaining the vision in my head lol.

I plan to keep toiling at this as I plan to use it as my base going forward.