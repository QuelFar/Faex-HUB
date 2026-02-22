import { useState } from "react"

import Sidebar from "../Sidebar/Sidebar";

import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoIcon from "@mui/icons-material/Photo";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublicIcon from "@mui/icons-material/Public";

import {
    ActivityCard,
    ActivityCardAvatarImage,
    ActivityCardBody,
    ActivityCardButtonLike,
    ActivityCardFooter,
    ActivityCardHeader,
    ActivityCardUserInfo,
    ContentWrapper, 
    DashboardContainer, 
    EditProfileButton, 
    FriendAvatarImage, 
    FriendInfo, 
    FriendItem, 
    FriendsCard, 
    Logoimage, 
    MainContent,
    PostActionButton,
    PostActionRow,
    PostAvatarImage,
    PostCard,
    PostInput,
    PostInputRow,
    PostPublishButton,
    ProfileAvatarWrapper, 
    ProfileBanner, 
    ProfileCard, 
    ProfileInfoRow, 
    ProfileTexts,
    RightPanel,
    SectionTitle,
} from "./Dashboard.styles";

const currentUser = {
  name: "Paulo Souza",
  email: "paulo.csouzas@outlook.com",
  avatar: "/perfil.jpg",
};

const friends = [
  { name: "Tiago Rocha", email: "tiagorocha@gmail.com", avatar: "/rosto_01.png" },
  { name: "Larissa Alves", email: "larissaalves@gmail.com", avatar: "/rosto_02.png" },
  { name: "Andreza Soares", email: "andrezasoares@gmail.com", avatar: "/rosto_03.png" },
  { name: "Julia Fernanda", email: "juliafernanda@gmail.com", avatar: "/rosto_04.png" },
  { name: "Marcela Silva", email: "marcelasilva@gmail.com", avatar: "/rosto_05.png" },
];

const activities = [
  {
    id: 1,
    name: "Felipe Silva",
    date: "8 de março às 18:00",
    avatar: "/rosto_06.png",
    post: "/post-01.png"
  },
  {
    id: 2,
    name: "Andreza Souza",
    date: "8 de março às 18:00",
    avatar: "/rosto_07.png",
    post: "/post-02.png"
  },
  {
    id: 3,
    name: "Felipe Silva",
    date: "8 de março às 18:00",
    avatar: "/rosto_06.png",
    post: "/post-01.png"
  },
];

export default function Dashboard() {
    const [postText, setPostText] = useState("");

    return (
        <DashboardContainer>
            <Sidebar />

            <ContentWrapper>
                <MainContent>
                    <ProfileCard>

                        <ProfileBanner>
                            <Logoimage src="./logo-white.png" alt="Logo Faex Hub" />
                        </ProfileBanner>

                        <ProfileInfoRow>
                            <ProfileAvatarWrapper>
                                <img src={currentUser.avatar} alt={currentUser.name} />
                            </ProfileAvatarWrapper>

                            <ProfileTexts>
                                <h2>{currentUser.name}</h2>
                                <span>{currentUser.email}</span>
                            </ProfileTexts>

                            <EditProfileButton>Editar Perfil</EditProfileButton>
                        </ProfileInfoRow>
                    
                    </ProfileCard>
                
                    <PostCard>

                        <PostInputRow>
                            <PostAvatarImage src={currentUser.avatar} alt={currentUser.name} />
                            <PostInput 
                                type="text" 
                                placeholder="Comece uma publicação" 
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                            />
                            <PostPublishButton>Publicar</PostPublishButton>
                        </PostInputRow>

                        <PostActionRow>
                            <PostActionButton>
                                <VideoLibraryIcon /> Video
                            </PostActionButton>
                            <PostActionButton>
                                <PhotoIcon /> Foto
                            </PostActionButton>
                        </PostActionRow>

                    </PostCard>

                    <SectionTitle>Atividades</SectionTitle>

                    {activities.map((activity) => (
                        <ActivityCard key={activity.id}>
                            <ActivityCardHeader>
                                <ActivityCardAvatarImage src={activity.avatar} alt={activity.name} />
                                <ActivityCardUserInfo>
                                    <strong>{activity.name}</strong>
                                    <span>
                                        {activity.date} 
                                        &middot; 
                                        <PublicIcon />
                                    </span>
                                </ActivityCardUserInfo>
                            </ActivityCardHeader>
                            <ActivityCardBody>
                                <img src={activity.post} alt={activity.name} />
                            </ActivityCardBody>
                            <ActivityCardFooter>
                                <ActivityCardButtonLike>
                                    <FavoriteBorderIcon /> Curtir
                                </ActivityCardButtonLike>
                            </ActivityCardFooter>
                        </ActivityCard>
                    ))}
                </MainContent>

                <RightPanel>
                    <SectionTitle>Amigos</SectionTitle>

                    <FriendsCard>
                        {friends.map((friend) => (
                            <FriendItem key={friend.email}>
                                <FriendAvatarImage src={friend.avatar} alt={friend.name} />
                                <FriendInfo>
                                    <strong>{friend.name}</strong>
                                    <span>{friend.email}</span>
                                </FriendInfo>
                            </FriendItem>
                        ))}
                    </FriendsCard>

                </RightPanel>
            </ContentWrapper>

        </DashboardContainer>
    )
}