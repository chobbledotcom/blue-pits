---
layout: page
title: Testimonials & Compliments | Blue Pits Housing Action
meta_description: Read testimonials and positive feedback from service users, families, and partner organisations about Blue Pits Housing Action's support services in Rochdale.
header_text: Compliments
top_links_name: Compliments
top_links_order: 7
---

Recent feedback from our service users and partner organisations.

### Latest Compliments (2025 - 2026)

#### Taiwo - Service User

*December 2025*

> Happy New Year, Vicky
>
> In my reflections as the year 2025 comes to an end, you came to mind as one of the few people who made constructive impact in my journey this far. I want to express my deep thought gratitude for all that you represented to me.
>
> Thank you for your kindness and support. Here's wishing you healthy, prosperous 2026 and beyond.

#### Close Family Member of a Tenant

*May 2026*

> Thank you for your care and support after a tenant had died.

#### UCLan Social Work Placement Team

*August 2026*

> I wanted to share my real appreciation about how Newbarn and Blue Pitts have worked to support practice learning with numerous students over the years. Many of the students we have placed with you are experiencing their own unique journeys towards becoming a social worker, some of which has included some difficult experiences on the course, such as failing previous placements. The person centred approach provided within the services at Newbarn and Blue Pitts, as well as the care given to supporting individual students, has been particularly valuable for these learners, and I wanted to acknowledge this and share my sincere thanks.

### Earlier Compliments (April - July 2025)

#### UCLAN - Student Placement Feedback

> Dear Vicky
> 
> Re: Student Placement feedback
> 
> The Placement Team would like to take this opportunity to thank you for all your hard work supporting our Social Work student whilst out on placement.
> 
> We have had some particularly positive feedback from our students that we would like to share with you.
> 
> The student felt well supported by you throughout the placement and rated placement learning opportunities very positively for the following.
> 
> - Developed Knowledge & Skills
> - Addressed areas for development
> - Inter-professional or multi-disciplinary practice
> - Standards of proficiency and standards of conduct, performance and ethics
> 
> Really enjoyed placement.
> 
> You have helped the student to grow in confidence and develop their professional identity.
> 
> We appreciate your dedication and look forward to working with you again soon.
> 
> Regards
> 
> SW Placement Team
> 
> *(sent on behalf of Social Work Placement Team)*

#### Rochdale Council Quality Assurance Officer

> Good afternoon Vicky.
>
> Thank you for letting me join your team meeting yesterday. It was such a pleasure to be part of your meeting and listening to your good news stories as well as other crucial discussions such as, risk assessing and CQC visits.
>
> I loved the good news story about the person who you support who was in hospital for 8 years and no other service would take this package of support on only you guys. To think that this individual is now looking at rebuilding his career is truly incredible and shows the hard work your support workers have achieved. It must have been really difficult for him as well as your support workers at first due to him being institutionalised so well done. You all should be really proud of yourselves.
>
> I loved how you empower your support team to contribute to the team meeting. I could see how hard Collins had worked on the case of managing risks of supporting people with Parkinson's.
>
> Please keep inviting me to other things because I love your service.
>
> Kind Regards

#### Parent of Service User

> The support staff keep me well informed, Blue Pits is an excellent service, Amanda communicates exceptionally well and advices me of any concerns, She is very competent. Marcia and Steph are very positive, friendly and upbeat with my Daughter.


<a id="trustpilot-reviews"></a>

### Trustpilot Reviews

{% assign trustpilot = site.data.reviews %}
{% if trustpilot and trustpilot.reviews.size > 0 %}

We are rated **{{ trustpilot.averageRating }} out of 5** from **{{ trustpilot.total }} reviews** on Trustpilot.

<a href="{{ trustpilot.profileUrl }}" rel="noopener">Read our Trustpilot profile</a>

{% for review in trustpilot.reviews %}
<div class="trustpilot-review">
  <h3>{{ review.title | escape }}</h3>
  <p>
    <strong>{{ review.author | escape }}</strong> &middot;
    {{ review.date | date: "%-d %B %Y" }} &middot; {{ review.rating }} out of 5
  </p>
  <blockquote>{{ review.text | escape | newline_to_br }}</blockquote>
  {% if review.url %}
  <p><a href="{{ review.url }}" rel="nofollow noopener">Read on Trustpilot</a></p>
  {% endif %}
</div>
{% endfor %}

{% else %}

Our Trustpilot reviews are being updated. In the meantime, you can [read them on Trustpilot](https://uk.trustpilot.com/review/bluepitshousingaction.co.uk).

{% endif %}
