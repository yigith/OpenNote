using System.ComponentModel.DataAnnotations;

namespace OpenNoteAPI.Dtos
{
    public class PostNoteDto
    {
        [Required, MaxLength(100)]
        public string Title { get; set; }

        public string Content { get; set; }
    }
}
