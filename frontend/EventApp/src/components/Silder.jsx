import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const images = [
  {
src:"https://www.eventbrite.co.uk/blog/wp-content/uploads/2022/06/Step-by-step-guide-to-moving-your-event-online-768x349.png",
    alt: "Slide 1",
    title: "Event Creation Now Easy",
    description: "Just fill details and there you go!",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZ5IUgvMXtzx7_PSUNEeXd5tD4vgQcYhdqg&s",
    alt: "Slide 2",
    title: "Art Exhibition",
    description: "An unforgettable journey into the world of fine arts.",
  },
  {
    src: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202206/WhatsApp_Image_2022-06-30_at_9_1200x768.jpeg?VersionId=I4P4B.xIhteTTrJBbqwrRVOh6o72k_ww",
    alt: "Slide 3",
    title: "MH CM Oath Ceremony",
    description: "The oath-taking ceremony is expected to be held tomorrow",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "30px",alignContent:"center" }}>
     
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "15px",
          width: "100%",
          height: "500px",
          margin: "0 auto",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "transform 1s ease-in-out",
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 100%",
                position: "relative",
                overflow: "hidden",
                "&:hover img": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  transition: "transform 0.5s ease-in-out",
                }}
              />
         
              <Box
                sx={{
                  position: "absolute",
                  bottom: "30px",
                  left: "50px",
                  color: "#fff",
                  textAlign: "left",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "20px",
                  borderRadius: "10px",
                  animation: "fadeIn 1s ease-in-out",
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "translateY(20px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {image.title}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                  {image.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>


      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        {images.map((_, index) => (
          <Button
            key={index}
            onClick={() => handleSlideChange(index)}
            sx={{
              width: "15px",
              height: "15px",
              minWidth: "15px",
              borderRadius: "50%",
              backgroundColor: currentSlide === index ? "#1976d2" : "#ccc",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              transition: "background-color 0.3s ease-in-out",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Slider;
