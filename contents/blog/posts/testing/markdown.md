---
slug: markdown
title: Testing Markdown in its Entirety
excerpt: Testing Markdown.
tags:
  - testing
meta:
  description: Testing Markdown.
components:
  - Foo
  - Bar
---

# TABLE OF CONTENTS

[[toc]]

# HEADERS

# Header 1

## Header 2

### Header 3

#### Header 4

#### Header 5

###### Header 6

====

# EMPHASIS

I am some normal text.
_I am some italic text._
**I am some bold text.**
**_Combining italic and bold._**

# LISTS

## UNORDERED

- Item 1
- Item 2
  - Item 2a
  - Item 2b

## ORDERED

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b

# IMAGES

![GitHub Logo](/img/github.png)

# LINKS

http://github.com - automatic!
[GitHub](http://github.com)

# BLOCKQUOTES

As Kanye West said:

> We're living the future so
> the present is our past.

# INLINE CODE

I think you should use an
`<addr>` element here instead.

# CODE BLOCKS

```css
.foo {
  color: red;
}
```

```js
(function() {
  alert("IEFEs FTW?!");
});
```

```html
<p class="blah">
  Goodbye markup world.
</p>
```

# CUSTOM COMPONENTS

Below in markdown file is written `<Foo />` and then `<Bar />`. Components are loaded dynamically.

<Foo />
<Bar/>

# TASK LISTS

- [x] this is a complete item
- [ ] this is an incomplete item

# TABLES

| First Header                | Second Header                |
| --------------------------- | ---------------------------- |
| Content from cell 1         | Content from cell 2          |
| Content in the first column | Content in the second column |

# STRIKETHROUGH

~~Testing strikethrough.~~

# EMOJIS

Can has emojis? :) :( :D
