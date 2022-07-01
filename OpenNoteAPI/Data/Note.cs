using System.ComponentModel.DataAnnotations;

namespace OpenNoteAPI.Data
{
    public class Note
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreatedTime { get; set; } = DateTime.Now;

        public DateTime ModifiedTime { get; set; } = DateTime.Now;
    }
}
