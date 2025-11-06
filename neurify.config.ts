export default {
  model: "meta-llama/Llama-3.3-70B-Instruct",
  token: process.env.TOKEN,
  guidelines: `
  
  
  - Ensure the generated components are responsive and adapt well to different screen sizes.
  - Follow best practices for accessibility, including proper use of ARIA attributes.
  - Use semantic HTML elements to enhance the structure and meaning of the content.
  - Apply consistent styling that aligns with modern UI/UX design principles.



  `,
  user: {
    mood: "neutral",
  },
  cache: {
    ttl: 3600,
  },
};
