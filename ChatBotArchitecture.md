# Dialog Flow Chat Bot Architecture
The MEGA BOT will have several sub-agents each of them serving specific tasks to complete a functioning role.
## Role 1: IUT Information Manager
> - [ ] Information about IUT
> This is a very broad category, need to simplify, organize and classify into tiny manageable chunks
>> - [ ] Information about Clubs and Communities and their activities
> - [ ] Common Questions
> This category is all about lucrative and trivial unofficial knowledge about IUT
> - [ ] Routes to IUT
> Will provide route from anywhere to IUT
> - [ ] Information about Staff and their operations
>> - [ ] Teachers
>> - [ ] Provosts
>> - [ ] Other Important Office Staffs
>
> - [ ] Prayer Times
> - [ ] Dining Options [Menu and Prices]
>> - [ ] CDS
>> - [ ] Official Canteen
>
> - [ ] Places of Interest around IUT

## Role 2: Basic Student Manager
> - [ ] Register for Provisioned Services
> - [ ] Routine Queries
>> - [ ] Query on Class time, place and instructor
>> - [ ] Extra Classes
> - [ ] Notice Queries
> - [ ] Set Notification Profile
> 
#### Registration
* The request of registration will be sent to the admin with name, UN_ID and Facebook Profile Link
* A six month old user must verify with his IUT mail ID or his registration will be canceled

#### Notification Profile
* General: Receive all kinds of notifications and reminders
* Critical A: Only receive critical notifications and reminders
* Critical B: Only receive critical notifications
* Silent: User will not receive any kinds of notification or reminder but notification will be queued.

Need to classify and list other categories critical notice:
* Examinations
* Changes in Routine
* Assignments 

## Role 3: Admin Manager
Class Representatives are Basic Admins
(N.B: Teachers are special type of Admins)
> - [ ] Confirm Registrations
> - [ ] Update Routines
> - [ ] Raise a Medical Emergency Alert
> - [ ] Call for donation or help

### Principles:
* There will be exactly two admins for each class
* The role of existing admin is transferable

## Role 4: IUT Connections Manager

> - [ ] Contact Anyone in IUT (Given that you know their ID)
> - [ ] Get probable location of Anyone in IUT
> 
### Policy of Making Connections:
* Admins can contact other admins directly without approval
* Any other types of connection requires on approval of both ends
* Teachers are exception to the location policy, any user can get any teacher's probable location
