---
layout: page
title: Testimonials, Compliments & Trustpilot Reviews | Blue Pits Housing Action
meta_description: Read testimonials and positive feedback from service users, families, partner organisations, and Trustpilot reviewers about Blue Pits Housing Action's support services in Rochdale.
header_text: Compliments
top_links_name: Compliments
top_links_order: 7
---

Recent feedback from our service users, families and partner organisations, alongside reviews left on Trustpilot.

<p class="compliments-intro">
  <a href="https://uk.trustpilot.com/review/bluepitshousingaction.co.uk" rel="noopener">
    Read our Trustpilot reviews
  </a>
  {% if site.data.reviews %}
  &mdash; rated <strong>{{ site.data.reviews.averageRating }} out of 5</strong> from
  {{ site.data.reviews.total }} reviews.
  {% endif %}
</p>

{% for item in site.data.all_compliments %}
<article class="compliment">
  <h3>{% if item.title != "" %}{{ item.title | escape }}{% else %}{{ item.author | escape }}{% endif %}</h3>
  <p class="compliment-meta">
    {% if item.title != "" %}<strong>{{ item.author | escape }}</strong> &middot; {% endif %}
    {% if item.display_date != "" %}{{ item.display_date }}{% else %}{{ item.date | date: "%-d %B %Y" }}{% endif %}
    {% if item.rating %} &middot; {{ item.rating }} out of 5{% endif %}
  </p>
  <blockquote>
    {% if item.source == "compliment" %}
      {{ item.text | markdownify }}
    {% else %}
      {{ item.text | escape | newline_to_br }}
    {% endif %}
  </blockquote>
  {% if item.url != "" %}
  <p><a href="{{ item.url }}" rel="nofollow noopener">Read on Trustpilot</a></p>
  {% endif %}
</article>
{% endfor %}
