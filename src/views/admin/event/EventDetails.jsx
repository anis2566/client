import React, { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import BreadCumb from "../../../components/BreadCumb";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "../../../store/reducers/event";

const EventDetails = () => {
  const [currentImg, setCurrentImg] = useState("");

  const { eventId } = useParams();
  const dispatch = useDispatch();

  const data = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      label: "Events",
      path: "/admin/event/list",
    },
    {
      label: "Details",
      path: `/admin/event/${eventId}`,
    },
  ];

  useEffect(() => {
    dispatch(getEvent(eventId));
  }, [eventId]);

  const { loading, event } = useSelector((store) => store.event);

  // SET CURRENT IMAGE
  useEffect(() => {
    if (event?.images) {
      setCurrentImg(event?.images[0]?.secure_url);
    }
  }, [event.images]);

  return (
    <Box>
      <BreadCumb data={data} />

      <Box bgcolor="#fff" p={2} mt={2}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "column", md: "row" }}
          gap={5}
          justifyContent="space-between"
        >
          {/* EVENT IMAGES */}
          <Box
            flex={0.7}
            // bgcolor="grey"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box p={2} border="2px solid grey">
              {currentImg && (
                <img
                  src={currentImg}
                  style={{
                    height: "400px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  alt="Big"
                />
              )}
            </Box>
            <Box display="flex" gap={2} mt={2}>
              {event.images &&
                event.images.map((image, i) => (
                  <Box
                    border={`${
                      currentImg === image.secure_url ? 2 : 1
                    }px solid grey`}
                    onClick={() => setCurrentImg(image.secure_url)}
                    key={i}
                  >
                    <img
                      src={image?.secure_url}
                      style={{
                        height: "50px",
                        width: "50px",
                        display: "block",
                      }}
                      alt="carousel-img"
                    />
                  </Box>
                ))}
            </Box>
          </Box>
          {/* EVENT INFO */}
          <Box flex={0.3}>
            <Typography fontSize={20} fontWeight={600} color={grey[700]}>
              fafa
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EventDetails;
