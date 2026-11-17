---
layout: page
title: Trustpilot Reviews | Blue Pits Housing Action
top_links_name: Reviews
top_links_order: 8
meta_description: Read verified Trustpilot reviews of Blue Pits Housing Action from service users, families, and partner organisations in Rochdale.
header_text: Reviews
---

{% assign trustpilot = site.data.reviews %}
{% if trustpilot and trustpilot.reviews.size > 0 %}

We are rated **{{ trustpilot.averageRating }} out of 5** from **{{ trustpilot.total }} reviews** on Trustpilot. These are the reviews left on Trustpilot; the handwritten compliments from service users and partner organisations are on our [Compliments page](/compliments/).

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
