import React from 'react';

function Quote({ text, author }) {
  return (
    <div>
      This is {author} and i said {text}
    </div>
  );
}

export default Quote;
