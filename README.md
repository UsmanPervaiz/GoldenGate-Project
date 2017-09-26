# GoldenGate | [Video Demo](https://www.youtube.com/watch?v=ZtQsc7Jv0KE&feature=youtu.be) | (Still under construction)

>### An e-commerce platform inspired by eBay and Amazon.com  
 > * **Developed a single page e-commerce website with Rails API backend and React component based frontend.**  
 > * **Employed JavaScript and React for user registration, product browsing, shopping cart placement, and check-out.**  
 > * **Utilized Rails and SQL to persist user data and CSS for enhanced user interface.** 

Welcome, and thank you for viewing my Github profile page.

This is my first after-school solo project and it is still in progress, about 75% is complete, but, I am still uploading a demo video to explain the features of this project for employment purposes. 

**The project is not re-factored as of yet, my main goal here is to practice everything that I have learned so far. I still have to separate Dumb Components from Smart Components, it can be seen that some Componenets are stateless, but still are defined as Class-Components. The most important thing to me is that whatever features I have implemented so far are working 100% and as desired. I have learned a lot in the past few weeks coding on my own, in the beginning some of my code was not according to the "DRY" principle, but as i progressed, my css and my coding got better and is still getting better. Overall I am happy and satisfied with my progress.**

I have been working on it for about 7-8 weeks, had many ups and downs, yes and nos, this and that moments. I wanted to bring it as close as possible to a real e-commerce website experience.

I used simple CSS because before moving onto bootstrap or any other designing framework, I really wanted to understand the basics of CSS.

No user data is being saved on the front-end, other than the JWT Token, that I am using to communicate with my Rails app to authenticate users.

I have also not used Redux for this project, because I wanted to work with React alone and learn how the Component State is moved around. After this project, whatever my next project will be, I will be using Redux from thereon.

So, lets talk about the features that I have already implemented:

### USER REGISTRATION VALIDATIONS (Client-Side and Server-Side):

Sending data is not enough, we also need to make sure that the data users fill out in forms is in the correct format we need to process it successfully, and that it won't break our applications. We also want to help our users to fill out our forms correctly and not get frustrated when trying to use our apps or websites.

Why do we insist on blocking our users at every turn? There are three main reasons:

- we want to get the right data, in  the right format -- our appliucation won't work properly if our user's data is stored in any old format they like, or if they don't enter the correct information in the correct places, or omit it altogether.

- we want to protect our users -- if they entered really easy passwords, or no password at all, then malicious users could easily get into their accounts and steal their data.

- we want to protect ourselves -- there are many ways that malicious users can misuse unprotected forms to damage the application.

Client-side server validation occurs in the browser before the data has been submitted to the server. This is more user-friendly than server-side validation as it gives an instant response. It is also less annoying for the user, because in server-side validations the user has to fill out the form and then submit to figure out if the data is acceptable to the server, but, with the front-end validations you can give instant and live guidance as the user is entering information.

Along with the Client-Side validations, I also have the Server-Side validations in place due to the fact that Client-Side validation can be completely bypassed by turning off JavaScript. Furthermore, it is trivial to edit the source of a page locally in order to disable or bypass even the most complex JS validation.

Server-Side validation is validation that occurs on the server, after the data has been submitted -- Server-Side code is used to validate the data before it is put into the database, and if it is wrong a response is sent back to the client to tell the user what went wrong.

Server-Side validdation is not as user-friendly as client side validation, as it requires a round trip to the server, but it is essential, it is your application's last line of defense against bad data.

**The way I have it set up as is that if the user is somehow able to bypass the JS validations and submit the form, a modal window will open up to inform the user of the Server-Side errors they need to fix in order to complete the registration process.**

> The validations implemented are:

> 1. User first and last name can only contain letters (aA-zZ) and cannot be blank.
> 2. Email must be in a valid format and cannot be blank.
> 3. The email and confirm email fields must match.
> 4. Password cannot begin with a number with a length of minimum 6 and maximum 15 characters.
> 5. The password and confirm password field must match.
> 6. Gender is optional and is not required.
> 7. Date of birth is required and must be a valid date and cannot be a date in future.
> 8. I did not disable the submit button, because the database is protected with the server-side validations.

### ACCOUNT REGISTRATION SECURITY QUESTIONS:

**A cool security feature that I have applied is to ask the user to answer any 3 out of 15 security questions, in order to recover their account or reset their password. This step comes right after the user clicks submit on the registration form. If for any reason the data enetered is not accurate, the user never moves on to the security questions and a modal window appears to inform the user about the server-side errors.**

The security question modal window will only appear if the enetered registration data passes all server-side validations. The account is created once the user answers any three security questions and submits them. 

The submit button will appear once any three questions have been selected and answered.

Rather then saving the answers as plain text, I am encrypting the answers and saving the encrypted hash into the database.

### SUCCESSFULL ACCOUNT CREATED MESSAGE:

Once the user submits the security questions and answers, they are informed with a "Account Created Successfully". The user is redirected to the "/main" page and their name will appear on top of the NavBar.

### SIGNIN MODAL:

I have two signin-in forms on the website, one is located inside the registration page and the other is a signin-modal window, which is displayed only when the user clicks on "Sign In".

### USER SIGN IN ERRORS:

I have not applied any validations on the sign in process, because during the registration I made sure that I am saving the correct information in the database. But, users do get informed about the wrong password and email combination or if there is no account in the database with the provided email address.

### UPDATING USER INFO:

The users have the option to update their personal info such as, name, email, date of birth, etc.

The password can also be updated.

Another cool feature that I have applied in this section is when the user wants to update his/her date of birth. The way I have it designed is 

### OPTION TO ADD BILLING AND SHIPPING ADDRESSES:

This feature has not yet been applied and is next in the list.

### QUANTITY INCREASE AND DECREASE BUTTONS:

Once the products are displayed, user will have the option to increase or decrease the quantity of any product to be added to the cart.

### ADD TO CART BUTTON:

After selecting the right quantity, user can click on "Add to cart."

Once the item has been successfully added to the user's cart on the server-side, the product will spin/rotate as a confirmation of successfull addition.

Along with the spin/rotate affect, **I have added another great feature which I think that almost every website on the internet is missing. The feature is that once the product has been added to your cart, that specific product will be faded permanently, untill deleted from the cart or paid for it. This feature is to make sure that you know what products are already in your cart, instead of going back and forth to your cart. This feature will help the user to not add multiple quatities of the same product by mistake.**

**Another feature added for user protection is that, let's say, you added 2 quantities of a product and now if you by mistake again add another 2 quatities of the same product (not knowing that the item is already in your cart), there will be no changes to your cart, in other words the cart will not be updated. The only time the cart will be updated is when the user adds a different quantity (plus or minus) then what is already in the cart.**

The above two features were added based on my personal online shopping experience. And I believe these features are a must have for any modern website.

### ADD TO CART QUANTITY NOTIFICATION:

As soon as the user adds anything to his/her cart, the cart icon in the NavBar is updated to display the number of products in the cart.

### EMPTY CART NOTIFICATION:

After the user has signed in and if he visits the Cart page, he will be informed about wheter he has any products in his cart or if it is empty.

The user is also asked to sign in if he is not already signed in.

### IN CART UPDATE BUTTON:

I have provided the user with the quantity increase and decrease buttons on the cart page. Once the quantity has been updated, an "Update Cart" button will appear only for the specific item you are trying to update.

The "Update Cart" button disappears after successfull changes to the product's quantity.

### IN CART SUCCESSFULL UPDATE NOTIFICATION:

In order to notify the user about the success of his changes to the product, the product will bounce once after the changes were successfully applied to the product.

### IN CART REMOVE BUTTON:

The user also has the option to remove an item from the cart with a click of a button.

### IN CART TOTAL:

The in-cart total is displayed right next to the products in the cart page. The total includes a fixed shipping rate of $9.99 and a tax of 8.75% on the total amount.

## FEATURES WAITING TO BE IMPLEMENTED:

1- User can add item to cart even if they are not signed in.
2- User can complete the checkout.
