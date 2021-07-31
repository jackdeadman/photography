<h2>Contact</h2>

<form name="contact" method="POST" data-netlify="true">
  <p>
    <label><span>Your Name:</span><input type="text" name="name" required/></label>   
  </p>
  <p>
    <label><span>Your Email:</span><input type="email" name="email" required/></label>
  </p>

  <p>
    <label><span>Message: </span><br><textarea name="message" required></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>

<style>

    label span {
        width: 100px;
        display: inline-block;
    }

    textarea {
        font-size: 1rem;
        width: 400px;
        min-height: 400px;
    }
</style>