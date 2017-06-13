#Approach and Thoughts

I used an existing project built with the angular CLI tools as a seed for this task, so I wouldn't waste too much time on the setup.
Once this was in place I started gathering the information I needed to request the bookings data.
I looked at the documentation and pieced together the request structure I would need to send.
I added this to a new service so it could be abstracted from my main component and swapped in and out if needed.
Then I updated my main component to call this service and then render the data from the response.
I added unit tests for both of these components.
Next I wrote a small protractor test to verify that the number of services rendered was the same as the number returned by the API.
Lastly, I extended the markup and added styles to be more visually appealing. I used CSS Grid to create the responsive grid layout.


If I were to continue this project into a larger application, there are some areas I would choose to expand or update:
* Access API keys etc via a server so they're not exposed - this is straightforward to do but wasn't necessary for this small application
* Similarly, use environment variables to access the API URL so it's not hardcoded in the service
* More styling - I kept my styles simple as design is not my forte! I am capable of implementing complex designs but I decided to focus on other areas for this project.
* Create a child component for the items within the grid - as functionality grows this would become more important
* Create a class for the bookable services object structure
* Set up a CI environment for running tests, linting, etc