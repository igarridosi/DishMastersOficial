import React from 'react'
// FAQ
import Question from './Questions';
import Header2 from "./Header";
import Footer from '../home/Footer';

export const FAQ = () => {
  return (
    <div>
      <Header2 />
      <h1 className="space-y-4 px-2 mx-auto max-w-5xl pt-4">1. General information about Dishmasters</h1>
      <Question
        title="Why Dishmasters?"
        text="Dishmasters is a recipe website where anyone can explore new dishes, find inspiration, or share their
          own culinary creations. It features the most up-to-date database of dishes from around the world and
          aims to be the ultimate destination for cooking enthusiasts."
      />
      <Question
        title="Who is behind Dishmasters?"
        text="Dishmasters is a recipe website where anyone can explore new dishes, find inspiration, or share their
          own culinary creations. It features the most up-to-date database of dishes from around the world and
          aims to be the ultimate destination for cooking enthusiasts."
      />
      <Question
        title="Why is Dishmasters special?"
        text="Users can explore their favorite meals, try them at home, and then rate and share their feedback. The
          platform also allows users to like posts and save their favorites, participate in exciting Dishy Challenges,
          and enjoy quick, one-minute short videos for bite-sized inspiration."
      />
      <Question
        title="Where can we find more about Dishmasters"
        text={
          <>
            Dishmasters is not a new project; it's an upgrade from an old personal project, which you can find at ‎
            <a href="https://dishmaster.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
              https://dishmaster.vercel.app/
            </a> or find more about us on our social networks.
          </>
        }
      />
      <hr className="mx-auto max-w-5xl text-black"></hr>

      <h1 className="space-y-4 px-2 mx-auto max-w-5xl pt-4">2. Account and Registration</h1>
      <Question
        title="How can I create an account on Dishmasters?"
        text="On our website's main page, the sign-in button will redirect you to the login page, where on the top 
          you can see a link where you can create your account easily."
      />
      <Question
        title="Can I change my email address or account information?"
        text="The users cannot manually change their email account but can contact the support team by filling out 
          the form that you have on the menu on the main page, and a support team member will contact you soon."
      />
      <hr className="mx-auto max-w-5xl text-black"></hr>

      <h1 className="space-y-4 px-2 mx-auto max-w-5xl pt-4">3. Challenges and Participation</h1>
      <Question
        title="What DishyChallenge is and how can I participate?"
        text="Dishychallenge is a dedicated page to have fun with the community where users can take part in
          themed cooking or recipe daily challenges. It is an engaging way to connect with others, display
          skills, and enjoy having friendly competition."
      />
      <Question
        title="How do I upload a recipe for a challenge?"
        text="COMMING SOON..."
      />
      <hr className="mx-auto max-w-5xl text-black"></hr>

      <h1 className="space-y-4 px-2 mx-auto max-w-5xl pt-4">4. Privacy and Security</h1>
      <Question
        title="How do we protect personal information?"
        text="We take your privacy seriously and implement several security measures to protect your personal data. 
          This includes using encryption to safeguard your sensitive information, limiting access to authorized personnel,
          and regularly reviewing our security protocols to ensure compliance with industry standards."
      />
      <Question
        title="Can I delete my account and data?"
        text="Yes, you have the right to delete your account and all the associated data at any time. 
          Just contact our support team and tell them that you want to delete all your data, and they will provide further instructions."
      />
      <Footer />
    </div>
  )
}

export default FAQ