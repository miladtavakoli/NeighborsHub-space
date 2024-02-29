import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BASE_URL } from "services/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import ConfirmationModal from "components/modal/confirmationModal";
import { deletePost, getDetailsPost } from "store/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { myInfoSelector } from "store/slices/userSlices";
import LandscapeIcon from "@mui/icons-material/Landscape";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "@mui/material/Button";
import SamplePostImage from "assets/images/samplePostImage.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { likeAction, deleteLikeAction } from "store/actions/postsActions";
import { authSelector } from "store/slices/authSlices";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { snackActions } from "utils/SnackbarUtils";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";

const Post = ({
  handleOpenModal,
  showLocationOnMap,
  data,
  handleClosePostsList,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const myInfo = useSelector(myInfoSelector);
  const isAuth = useSelector(authSelector);
  const isMyPost = myInfo.id === data.created_by.id;
  const [contactOpen, setContactOpen] = useState(false);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenConfirmationModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = () => {
    dispatch(deletePost({ id: data.id })).then(() => {
      handleClose();
      handleClosePostsList();
    });
  };

  const handleLike = () => {
    dispatch(likeAction({ id: data.id }));
  };
  const handleRemoveLike = () => {
    dispatch(deleteLikeAction({ id: data.id }));
  };

  const handleMoreDetails = () => {
    dispatch(getDetailsPost({ id: data.id }));
  };

  const handleCloseContactMenu = () => {
    setContactOpen(false);
  };

  const handleCopyToClipboard = (value) => {
    if (isAuth) {
      navigator.clipboard.writeText(value);
      snackActions.info("Copied To Clipboard");
    } else {
      snackActions.warning("You Need To Login To Use This Information");
    }
  };

  return (
    <Grid container direction={"column"} sx={{ pb: 3 }}>
      <Grid
        container
        sx={{ backgroundColor: "lightGray" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {data.media?.length >= 1 ? (
          <Carousel
            showArrows
            showThumbs={false}
            showStatus={false}
            width={"100%"}
          >
            {data.media.map((item, index) => (
              <div key={index}>
                {["jpg", "jpeg", "png", "gif"].includes(
                  item.file.split(".").pop()
                ) ? (
                  <img
                    src={item?.file}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "contain",
                    }}
                    key={index}
                  />
                ) : (
                  <video
                    src={item?.file}
                    width={"90%"}
                    height={"300px"}
                    style={{ objectFit: "contain" }}
                    controls
                  />
                )}
              </div>
            ))}
          </Carousel>
        ) : (
          // <LandscapeIcon sx={{ fontSize: 300, color: "gray" }} />
          <img
            src={SamplePostImage.src}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "contain",
            }}
          />
        )}
      </Grid>

      <Grid container justifyContent={"space-between"}>
        <Grid
          container
          flexWrap={"nowrap"}
          alignItems={"flex-start"}
          sx={{ mt: 2 }}
        >
          <Typography
            sx={{ fontWeight: "bold", px: 2, wordBreak: "break-word" }}
            variant="h5"
          >
            {data.title}
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{ mt: 2, px: 2 }}
          flexWrap={"nowrap"}
        >
          <Grid container alignItems={"center"}>
            <Avatar
              alt={data.created_by?.first_name}
              src={BASE_URL + data.created_by?.avatar.avatar_thumbnail}
            />
            <Typography sx={{ ml: 1, fontWeight: "bold" }}>
              {data.created_by?.first_name + " " + data.created_by?.last_name}
            </Typography>

            {!isMyPost &&
              isAuth &&
              (data.is_user_liked ? (
                <IconButton onClick={handleRemoveLike}>
                  <ThumbUpAltIcon sx={{ fill: "red" }} />
                </IconButton>
              ) : (
                <IconButton onClick={handleLike}>
                  <ThumbUpOffAltIcon />
                </IconButton>
              ))}
          </Grid>
          <Grid container justifyContent={"flex-end"}>
            <Button
              onClick={(e) => setContactOpen(e.currentTarget)}
              variant="text"
            >
              Contact
            </Button>
            {(showLocationOnMap || isMyPost) && (
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              id="basic-menu"
              anchorEl={contactOpen}
              open={contactOpen}
              onClose={handleCloseContactMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{ minWidth: "300px" }}
            >
              {data.created_by?.email && (
                <MenuItem
                  sx={{ minWidth: "300px" }}
                  onClick={() => handleCopyToClipboard(data.created_by?.email)}
                >
                  <AlternateEmailIcon sx={{ mr: 1 }} />
                  {data.created_by?.email}
                </MenuItem>
              )}
              {data.created_by?.mobile && (
                <MenuItem
                  sx={{ minWidth: "300px" }}
                  onClick={() => handleCopyToClipboard(data.created_by?.mobile)}
                >
                  <PhoneIphoneIcon sx={{ mr: 1 }} />
                  {data.created_by?.mobile}
                </MenuItem>
              )}
            </Menu>
          </Grid>
        </Grid>
        {!isMyPost && data.distance && (
          <Grid container sx={{ px: 2, mt: 1 }}>
            <SocialDistanceIcon />
            <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
              {data.distance} meter away
            </Typography>
          </Grid>
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {showLocationOnMap && (
            <MenuItem
              onClick={() => {
                handleOpenModal(data);
                setAnchorEl(null);
              }}
            >
              <LocationOnIcon sx={{ mr: 0.5 }} /> Show On Map
            </MenuItem>
          )}
          {isMyPost && (
            <MenuItem
              onClick={() => {
                handleOpenConfirmationModal();
                setAnchorEl(null);
              }}
              sx={{ color: "red" }}
            >
              <DeleteIcon /> Delete
            </MenuItem>
          )}
        </Menu>
      </Grid>
      <Typography
        sx={{ mt: 1, px: 3, color: "gray", wordBreak: "break-all" }}
        variant="subtitle1"
      >
        {data.body}
      </Typography>
      <Button
        variant="text"
        // sx={{ mt: 1, px: 3, color: "gray" }}
        onClick={handleMoreDetails}
      >
        More Details
      </Button>
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleDeletePost}
        text="Are You Sure about Deleting This Post?"
        width={"sm"}
      />
    </Grid>
  );
};

export default Post;
