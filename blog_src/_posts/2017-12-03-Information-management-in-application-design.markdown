---
layout: post
title:  "Information management in application design"
author: "David Mesquita-Morris"
date:   2017-12-03 10:23:39 +0000
categories: information
---
When designing and building applications solution architects need to consider many different viewpoints [RW1]; once of which is the information viewpoint. This post discusses the different types of information managed within an application, what they all have in common and how they differ.

So, what are the different types of information? An application designer needs to consider:
-	**Internal domain state**: the core/primary information under management within the application; this can be information that the application masters itself, or information that the application receives and caches that is mastered within other applications.
-	**Internal process state**: the applications internal process management information.
-	**External domain state**: this is information that the application is ready to present the wider enterprise with; this could be exposed by an API or by sending messages. A key differentiator from the internal domain state is that the business logic embodied within the application explicitly chooses what information to available and when.
-	**External process state**: these are notifications that the application generates in the wider enterprise context, articulating significant business events that occurred within the application; these are typically exposed by sending messages. It is common that the notification of the business event may reference external domain state.
The rest of this post makes recommendations as how to manage these different kinds of state.

# Transactional consistency
First and foremost, application business logic must update all types of state (that the business logic impacts) within a single ACID transaction to provide consistency across the four types of state, which is essential to the long-term data quality and operational integrity of the application (both within the application and its wider enterprise context).

Imagine if a piece of business logic updated some internal domain and process state but the process state update failed; it is quite likely that the same piece of business logic may be executed a second time. Or conversely, the internal process state updated without the internal domain state, then the effect of operations may be missed altogether.  While this seems like an unlikely scenario, there are commercial workflow management engines that are incapable of managing internal domain state and internal process state in a single transaction.

This problem becomes more acute when dealing with messaging systems for propagating external domain and process state to other applications. As this scenario typically involves multiple resource providers some form of distributed transaction management is required. Without distributed transaction management, it is not hard to foresee scenarios where messages can be dispatched multiple times or not at all. Distributed state management will be the subject of a future post.

When debugging the side effects of these failure scenarios, is often difficult to establish the root cause and very tough to repeat the failure.

# Separation of concerns
While it may be simple to add a status field to a business object (internal domain state) to hold internal process state, we would recommend managing internal domain state in a separate object/table. This provides strong separation of concerns across the objects/tables and in this case, requires us only to update the internal domain state when it changes, and not when either it or the internal process state changes. As an example, if a business process required one person to enter information (internal domain state) and a second person to approve it, the second operation is only an update of internal process state.

The example above becomes more nuanced when the approval means the internal domain state is promoted to external domain state. Prior to the approval the internal domain state is private to the application and after the approval, it is externally observable and therefore part of the application external domain state. Now, imagine if the first person makes an update to the information (also requiring approval). Clearly, we must maintain several versions of the information as the internal domain state (prior to its approval) is now different to the external domain state. There can be many more complications (what if the approver rejected the update) that further reinforce the need for versioning. Now, for the consumers of the external domain state, do we want them to be aware of the number of internal revisions of the information? Probably not.

Therefore, we recommend separate copies of internal and external domain state. This has further benefits when providing query services to external consumers; the likelihood of locking conflicts is reduced.

A final consideration on the separation of concerns is the information cardinality of business events; i.e. the number of business objects a business event impacts. As application complexity grows, it becomes more likely that a single business event may impact multiple business objects. Therefore, we recommend separation of external process state from external domain state.

In conclusion, we suggest separate types within your application for each of the four types of state listed above.

# Encapsulation
As internal domain and process state are private to the application, we finally recommend application of object-oriented encapsulation principles:
-	Surrogate keys are private to the applications internal domain and process state and should not extend into the external domain and/or process state.
-	Consider different representations of external domain and process state, optimised for the access profile of external consumers.
-	Consider idempotence of external domain and process state query; i.e. ensure the same query results in the same result regardless of the overall application state.

# References
RW1:	Rozanski, Woods: Software Systems Architecture; Addison Wesley, 2005
https://www.viewpoints-and-perspectives.info/home/viewpoints/.
