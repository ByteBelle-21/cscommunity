import './profile.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { getMainPost, fetchSelectedUserDetails,getActiveUsers,SelectedUserDetailsCanvas,fetchUserMedia } from './functions.js';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
function Profile(){
    const navigateTo = useNavigate();

    const[showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
    const openDeleteProfileModal = ()=>{
        setShowDeleteProfileModal(true);
    }

    const closeDeleteProfileModal = ()=>{
        setShowDeleteProfileModal(false);
    }

    const[showAddMediaModal, setShowAddMediaModal] = useState(false);
    const openAddMediaModal = ()=>{
        setShowAddMediaModal(true);
    }

    const closeAddMediaModal = ()=>{
        setShowAddMediaModal(false);
        setMediaType("");
        setMediaLink("");
    }


    const [activeMembers, setActiveMembers] = useState([]);
    useEffect(()=>{
        getActiveUsers(setActiveMembers);  
    },[]);


    const[showOffCanvas, setShowOffCanvas] = useState(false);
    const openOffCanvas = ()=>{
        setShowOffCanvas(true);
    }

    const closeOffCanvas = ()=>{
        setShowOffCanvas(false);
    }

    const handleMessage=(selectedUser)=>{
        navigateTo(`/messages/${selectedUser}`);
    }

    const goToChannel = (channel) =>{
        navigateTo(`/channels/${channel}`);
    }

    const [popularChannels, setPopularChannels] = useState([]);
    useEffect(()=>{
        const fetchChannels= async()=>{
            try {
                const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/popularchannels');
                if (response.status === 200) {
                    setPopularChannels(response.data);
                    console.log("Successfully retrieved popular channels");
                } 
            }catch (error) {
                console.error("Catched axios error: ",error);
            }
        }
        fetchChannels();  
    },[]);

    useEffect(()=>{
        fetchUserDetails();
    },[]);


    const [id, setId] = useState();
    const [userDetails, setUserDetails] = useState([]);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [skills, setSkills] = useState('');
    const [avatar, setAvatar] = useState(''); 

    const fetchUserDetails= async()=>{
        const current_user = sessionStorage.getItem('auth_user');
        try {
            const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/selected-user',{
                params: {user: current_user}
            });
            if (response.status === 200) {
                setId(response.data.id);
                setUserDetails(response.data);
                setName(response.data.name);
                setUsername(response.data.username);
                setEmail(response.data.email);
                setOccupation(response.data.occupation);
                setSkills(response.data.skills);
                setAvatar(response.data.avatar);
                console.log("Successfully retrieved current user details");
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
    }


    const [isEditMode, setEditMode] = useState(false);
    const handleEditButtonClick = ()=>{
        setEditMode(!isEditMode);
    }

    const showPreview =(text, num)=>{
        const words = text.split(' ');
        return words.slice(0, num).join(' ')+" . . . . . . . .";
    }

    const saveChanges = async(e)=>{
        const userId = id;
        const skillsArray = skills.split(',').map(item => item.trim()).join(',');
        if(skillsArray.length ==0 || !username || !email || !name || !occupation || !avatar){
            return;
        }
        const data = {
            userId,username, email, name, occupation, skills: skillsArray, avatar
        }
        try {
            const response = await axios.put('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/saveChanges', data);
            if (response.status === 200) {
                handleEditButtonClick();
                fetchUserDetails();
                console.log("Successfully saved all changes")
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
    }


    const [mainPost, setMainPost] = useState(null); 
    const goToPost = async (postId,channelName) =>{
        getMainPost(postId,setMainPost);
        if(mainPost){
            navigateTo(`/channels/${encodeURIComponent(channelName)}?postId=${mainPost}`);
        }
    }


   const[ userSocialMedia, setUserSocialMedia] = useState([]);
   const [socialMedialLimit, setSocialMediaLimit] = useState(false);
    useEffect(()=>{
        if(userDetails != []){
            fetchUserMedia(userDetails.id, setUserSocialMedia);
            if(userSocialMedia.length === 3){
                setSocialMediaLimit(true);
            }
            else{
                setSocialMediaLimit(false);
            }
        }
    },[userDetails]);

  
   

    const handleMediaDeletion = async (mediaID, selectedMediaType) => {
        try {
            const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/removeSocialMedia',{
                params: {user: mediaID , type : selectedMediaType}
            });
            if (response.status === 200) {
                console.log("Successfully deleted current user social media");
                fetchUserMedia();
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
    }

    const[mediaType, setMediaType] = useState("");
    const[mediaLink, setMediaLink] = useState("");
    const handleMediaAddition = async () => {
        const data = {id ,mediaType,mediaLink}
        try {
            const response = await axios.post('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/addSocialMedia',data);
            if (response.status === 200) {
                console.log("Successfully added current user social media");
                setMediaType("");
                setMediaLink("");
                closeAddMediaModal();
                fetchUserMedia();
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
    }

    const [avatarShow, setAvatarShow] = useState(false);
    const openAvatar=()=>{
        setAvatarShow(true);
    }
    const closeAvatar= ()=>{
        setAvatarShow(false);
    }

    const [selectedAvatar, setSelectedAvatar] = useState();
    const handleAvatarClick=(index,imgNum)=>{
        setSelectedAvatar(index);
        setAvatar(`/Group ${imgNum}.png`);
    }


    return(
        <div className="profile">
            <div className='profile-left-block'>
                <ListGroup as="ol" className='profile-suggestions-list'>
                    <p className='fw-bold' style={{padding:'1vh'}}>Top Profiles</p>
                    <hr style={{margin:'0'}}></hr>
                    {activeMembers.length > 0 && activeMembers.map(member=>(
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start suggestion-item">
                            <div className="image-container">
                                <Image 
                                    src={member.avatar}
                                    className="top-user-img" 
                                    roundedCircle 
                                />
                            </div>
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">{member.name}</div>
                                <Link className='view-link' onClick={openOffCanvas}>View Profile</Link>
                                <SelectedUserDetailsCanvas showOffCanvas={showOffCanvas} closeOffCanvas={closeOffCanvas} otherUser={member.username} />
                            </div>
                            <Nav.Link onClick={() => handleMessage(member.username)} >
                                <span 
                                class="material-symbols-outlined message-link" 
                                style={{fontSize:'1vw'}}
                                >
                                    chat_bubble
                                </span>
                            </Nav.Link>  
                        </ListGroup.Item> 
                    ))}
                    </ListGroup>
                    <div className='top-channels-block'>
                            <p className='fw-bold'>Currently Popular Channels</p>
                            <ListGroup as="ol" >
                                {popularChannels.length > 0 && popularChannels.map(channel=>(
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start suggestion-item" 
                                        onClick={() => {goToChannel(channel.channel)}}>
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{channel.channel}</div>
                                            <span className='sfont'>Created by {channel.username}</span>
                                        </div>
                                        <Badge className='badge'pill>{channel.totalposts} </Badge>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>                               
                    </div>
            </div>
            <div className='large-block'>
                <div className='own-profile-img-block'>
                    {isEditMode ? 
                        <>
                            <Image src={userDetails.avatar} className='own-profile-img edit-mode-img'  roundedCircle  onClick={() => {openAvatar()}}/>
                            <Modal 
                                size="lg" 
                                show={avatarShow} 
                                onHide={setAvatarShow}
                                centered>
                                <Modal.Body>
                                    <p className='mfont create-channel-title' >
                                        <span 
                                            class="material-symbols-outlined" 
                                            style={{fontSize:'1.5vw', 
                                                    marginRight:'0.5vh',
                                                    color:'#2F3C7E'}}>
                                            account_circle
                                        </span>
                                       Choose Your profile
                                    </p>
                                    <p>Pick your favorite avatar to represent you in this community</p>
                                    <div className='profile-row'>
    
                                        {[301, 302, 303, 304, 306, 305].map((imgNum, index) => (
                                            <img 
                                            src={`/Group ${imgNum}.png`} 
                                            className='profile-row-img' 
                                            onClick={(()=>{handleAvatarClick(index,imgNum)})}
                                            style={{border:selectedAvatar  === index ? "solid 2px  #f02132": ""}}/>
                                        ))}
                                    </div>
                                </Modal.Body>
                                <Modal.Footer style={{border:'none', backgroundColor:'#f0f5fa'}}>
                                    <Button className='cancle-channel-btn' onClick={closeAvatar}>
                                        Cancle
                                    </Button>
                                    <Button className='edit-profile-btn' onClick={closeAvatar}>
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <span style={{color:'red', fontSize:'small', marginBottom:'0.5vh'}}> Click on image to edit</span>
                        </>
                    : <Image src={userDetails.avatar} className='own-profile-img' roundedCircle />}
                    {isEditMode ? (
                        <Button className="edit-profile-btn" onClick={()=>{saveChanges()}} >
                            Save Changes
                        </Button>

                    ):
                    <Button className="edit-profile-btn" onClick={() => {handleEditButtonClick()}} >
                        <span class="material-symbols-outlined " style={{marginRight:'1vh'}}> edit </span>
                        Edit Profile
                    </Button>}
                    <Button className="delete-profile-btn" onClick={openDeleteProfileModal}>
                        <span class="material-symbols-outlined " style={{marginRight:'1vh'}}> edit </span>
                        Delete Profile
                    </Button>
                    <Modal 
                        size="md" 
                        show={showDeleteProfileModal} 
                        onHide={closeDeleteProfileModal}
                        centered>
                        <Modal.Body>
                            <p className='mfont create-channel-title' >
                                <span 
                                    class="material-symbols-outlined" 
                                    style={{fontSize:'1.5vw', 
                                            marginRight:'0.5vh',
                                            color:'red'}}>
                                    error
                                </span>
                                Delete Your Profile ?
                            </p>
                            <p>Remeber, This action <span style={{color:'red', fontWeight:'bold'}}> CANNOT </span> 
                                be undone. You will loose your data, posts,connections, everything !</p>
                        </Modal.Body>
                        <Modal.Footer style={{border:'none', backgroundColor:'#f0f5fa'}}>
                            <Button className='cancle-channel-btn' onClick={closeDeleteProfileModal}>
                                Cancle
                            </Button>
                            <Button className='delete-modal-btn' onClick={closeDeleteProfileModal}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className='social-media-details'>
                        <Stack direction='horizontal' gap={1} style={{marginTop:'4vh'}}>
                            <Stack direction='vertical' style={{alignItems:'center'}}>
                                <span style={{fontWeight:'bold'}}>{userDetails.totalPosts}</span>
                                <span style={{fontSize:'small'}}>Total Posts</span>
                            </Stack>
                            <Stack direction='vertical' style={{alignItems:'center'}}>
                                <span style={{fontWeight:'bold'}}>{userDetails.totalConnections}</span>
                                <span style={{fontSize:'small'}}>Total Connections</span>
                            </Stack>
                        </Stack>
                        <div className='actual-social-media-details'>
                            <ListGroup as="ol" className='profile-suggestions-list'>
                                <ListGroup.Item className='suggestion-item' as="li">
                                    <div className="fw-bold" style={{display:'flex', justifyContent:'space-between'}}>
                                        Linked Social Media Accounts
                                        {socialMedialLimit ? 
                                        <span class="material-symbols-outlined" style={{opacity:'60%'}}>add</span>
                                        :
                                        <Link onClick={openAddMediaModal}>
                                            <span class="material-symbols-outlined">add</span>
                                        </Link>
                                        } 
                                        
                                    </div>
                                    {socialMedialLimit ? <p style={{color:'red', fontSize:'small'}}>You can link upto 3 socila media accounts</p> :<></>}
                                    <hr style={{marginBottom:'0'}}></hr>
                                </ListGroup.Item>
                                <Modal 
                                    size="md" 
                                    show={showAddMediaModal} 
                                    onHide={closeAddMediaModal}
                                    centered>
                                    <Modal.Body>
                                        <p className='mfont create-channel-title' >
                                            <span 
                                                class="material-symbols-outlined" 
                                                style={{fontSize:'1.5vw', 
                                                        marginRight:'1vh',
                                                        color:'#2F3C7E'
                                                }}>
                                                person_add
                                            </span>
                                            Link New Social Media Account
                                        </p>
                                        <p>Remeber, You can link upto 3 social media accounts.</p>
                                        <Form.Label htmlFor="inputPassword5">Choose Media Type</Form.Label>
                                        <Form.Select aria-label="Default select example"  className="mb-3"  onChange={(e) => setMediaType( e.target.value)}>
                                            <option>Select media</option>
                                            <option value="1">Instagram</option>
                                            <option value="2">Facebook</option>
                                            <option value="3">LinkedIn</option>
                                            <option value="4">SnapChat</option>
                                            <option value="5">Reddit</option>
                                            <option value="6">Youtube</option>
                                        </Form.Select>
                                        <Form.Label htmlFor="basic-url">Add URL to your Account</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon3">
                                            https:
                                            </InputGroup.Text>
                                            <Form.Control id="basic-url" aria-describedby="basic-addon3"  onChange={(e) => setMediaLink( e.target.value)}/>
                                        </InputGroup>
                                    </Modal.Body>
                                    <Modal.Footer style={{border:'none', backgroundColor:'#f0f5fa'}}>
                                        <Button className='cancle-channel-btn' onClick={closeAddMediaModal}>
                                            Cancle
                                        </Button>
                                        <Button className='edit-profile-btn' onClick={()=>{handleMediaAddition()}}>
                                            Link Account
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                {userSocialMedia.length > 0 && userSocialMedia.map(media=>(
                                     <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start suggestion-item">
                                        <div className="image-container">
                                            <Image 
                                                src={`/${media.type}.png`}
                                                className="top-user-img" 
                                                roundedCircle 
                                            />
                                        </div>
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{media.link}</div>
                                        </div>
                                        <Nav.Link onClick={() => {handleMediaDeletion(id,media.type)}} ><span class="material-symbols-outlined message-link" style={{fontSize:'1vw'}}>delete</span></Nav.Link>  
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div> 
                    </div> 
                   

                </div>
                <div className='profile-details-block'>
                    <div className='user-text-details'>
                        <p className='fw-bold'>User Details</p>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Name"
                                        defaultValue={userDetails.name}
                                        readOnly={!isEditMode} 
                                        onChange={(e) => setName( e.target.value)}
                                    />
                                  
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            <Form.Control
                                            type="text"
                                            placeholder={userDetails.username}
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            readOnly={!isEditMode} 
                                            onChange={(e) => setUsername( e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                        <Form.Label>Email address</Form.Label>
                                        
                                        <Form.Control 
                                        type="text" 
                                        placeholder={userDetails.email} 
                                        required  
                                        readOnly={!isEditMode}
                                        onChange={(e) => setEmail( e.target.value)} />
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                                        <Form.Label>Occupation</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder={userDetails.occupation} 
                                        required  
                                        readOnly={!isEditMode} 
                                        onChange={(e) => setOccupation( e.target.value)}/>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="9" >
                                        <Form.Label>Skills</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder={
                                                (userDetails.skills ? 
                                                    userDetails.skills.split(',').map(skill => skill.trim()).join(', ') : 
                                                    "No skills available"
                                                )
                                            } 
                                        required  
                                        readOnly={!isEditMode}
                                        onChange={(e) => setSkills( e.target.value)} />
                                    </Form.Group>
                                </Row>
                            </Form>
                            <hr style={{marginTop:'4vh', marginBottom:'4vh'}}></hr>
                        </div>
                        <div className='recent-activities-block'>
                            <p className='fw-bold' style={{display:'flex'}}>
                                <span class="material-symbols-outlined" style={{marginRight:'1vh'}}>
                                    history
                                </span> 
                                Recent Activities
                            </p>
                            <div className='history-block'>
                                <ListGroup as="ol" >
                                    {userDetails.posts ? ( userDetails.posts.map(post =>(
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start history-item" 
                                            onClick={()=>{goToPost(post.id,post.channel )}}>
                                            <div className="ms-2 me-auto">
                                            <div className="fw-bold">{post.channel}</div>
                                                {showPreview(post.post,10)}
                                            </div>
                                            <Link className='view-post-link' onClick={()=>{goToPost(post.id,post.channel)}}>View Post</Link>
                                        </ListGroup.Item>
                                        )))
                                        : <div>No activities yet</div>}
                                </ListGroup>                   
                            </div>
                        </div>

                    </div>
            </div>

        </div>
    );
}

export default Profile;