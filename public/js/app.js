document.addEventListener('DOMContentLoaded', function () {
  const editButtons = document.querySelectorAll('.edit-button');
  const modal = document.getElementById('editModal');
  const titleInput = document.getElementById('editTitle');
  const contentInput = document.getElementById('editContent');
  const saveButton = document.getElementById('saveChanges');

  let postId = '';

  editButtons.forEach((button) => {
    button.addEventListener('click', async function () {
      postId = button.dataset.postId;
      const response = await fetch(`/edit/${postId}`);
      const blogPost = await response.json();

      titleInput.value = blogPost.title;
      contentInput.value = blogPost.content;
      modal.style.display = 'block';
    });
  });

  saveButton.addEventListener('click', async function () {
    const updatedTitle = titleInput.value;
    const updatedContent = contentInput.value;

    const response = await fetch(`/edit/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `title=${encodeURIComponent(updatedTitle)}&content=${encodeURIComponent(updatedContent)}`,
    });

    const result = await response.json();
    alert(result.message);

    // Close the modal after saving changes
    modal.style.display = 'none';
    window.location.reload(); // Reload the page to reflect changes
  });
});