export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "introduction-to-cnc-machining",
    title: "Introduction to CNC Machining",
    excerpt: "Learn the basics of Computer Numerical Control machining, its applications, and why it's a crucial skill in modern manufacturing.",
    content: `
      <h2>The Basics of CNC</h2>
      <p>Computer Numerical Control (CNC) machining is a manufacturing process in which pre-programmed computer software dictates the movement of factory tools and machinery. The process can be used to control a range of complex machinery, from grinders and lathes to mills and CNC routers. With CNC machining, three-dimensional cutting tasks can be accomplished in a single set of prompts.</p>
      <h3>Why Learn CNC?</h3>
      <p>Precision manufacturing is at the heart of modern industry. Whether you are creating intricate parts for aerospace engineering or reliable components for automotive assembly, CNC machining allows for unparalleled precision and repeatability.</p>
      <ul>
        <li>High precision and accuracy.</li>
        <li>Efficiency in large-scale production.</li>
        <li>Ability to work with a wide range of materials.</li>
      </ul>
      <p>At Finix CNC Institute, we focus on providing hands-on experience with these advanced machines to prepare you for a rewarding career.</p>
    `
  },
  {
    id: 2,
    slug: "advanced-milling-techniques",
    title: "Advanced Milling Techniques",
    excerpt: "Discover advanced milling techniques that can help you achieve better surface finishes, tighter tolerances, and faster production times.",
    content: `
      <h2>Going Beyond the Basics</h2>
      <p>Once you have mastered the basics of CNC milling, it's time to explore advanced techniques that can significantly improve your machining outcomes. Advanced milling involves understanding and optimizing cutting parameters, tool paths, and workholding solutions.</p>
      <h3>Key Advanced Techniques</h3>
      <ul>
        <li><strong>High-Speed Machining (HSM):</strong> Techniques that utilize high spindle speeds and feed rates to achieve faster material removal rates and superior surface finishes.</li>
        <li><strong>5-Axis Machining:</strong> Utilizing machines capable of moving a tool or a part in five different axes simultaneously, allowing for the creation of complex geometries.</li>
        <li><strong>Trochoidal Milling:</strong> A strategy that uses circular tool paths to maintain a constant tool engagement angle and reduce tool wear.</li>
      </ul>
      <p>Our advanced courses cover these techniques in depth, providing you with the skills needed to tackle complex machining challenges.</p>
    `
  }
];
