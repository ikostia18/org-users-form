import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalRef } from '../../components/Modal/index.tsx';
import data from '../../mocks/data.json';
import { SelectItem } from '../../utils/types.ts';
import CustomSelect from '../../components/CustomSelect/index.tsx';
import MultiSelect from '../../components/MultiSelect/index.tsx';
import { useNavigate } from 'react-router-dom';
import { SESSION_STORAGE_KEY } from '../../utils/consts.ts';
import Button from '../../components/Button/index.tsx';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const SubscribePageContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  height: 100%;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SubmitButton = styled(Button)`
  width: 95%;
`;

const SubscribePage = () => {
  const navigate = useNavigate();

  const modalRef = useRef<ModalRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<SelectItem | null>(null);
  const [selectedUsersIds, setSelectedUsersIds] = useState<SelectItem[]>([]);

  useEffect(() => {
    setSelectedUsersIds([]);
  }, [selectedOrg]);

  useEffect(() => {
    setSelectedUsersIds([]);
    setSelectedOrg(null);
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const organizationItems: SelectItem[] = useMemo(() =>
    data.organizations.map(org => ({
      id: org.id,
      label: org.name
    })),
    [data.organizations]
  );

  const userItems: SelectItem[] = useMemo(() => data.users.filter(user => user.organizationId === selectedOrg?.id)
    .map(user => ({
      id: user.id,
      label: `${user.firstName} ${user.lastName}`
    })), [data.users, selectedOrg]);

  const handleOrgSelect = (orgId: string) => {
    const selectedOrg = organizationItems.find(org => org.id === orgId);
    if (selectedOrg) {
      setSelectedOrg({ id: selectedOrg.id, label: selectedOrg.label });
    }
  };

  const handleUsersSelect = (selectedItems: SelectItem[]) => {
    setSelectedUsersIds(selectedItems);
  };

  const handleSubmit = () => {
    // LocalStorage can be in used as well
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      orgLabel: selectedOrg?.label,
      userIds: selectedUsersIds.map(user => user.label),
    }));

    modalRef.current?.closeModal();
    setTimeout(() => {
      navigate('/');
    }, 400);
  };

  return (
    <SubscribePageContainer>
      <Button onClick={toggleModal}>Subscribe</Button>

      {isModalOpen && (
        <Modal onClose={toggleModal} ref={modalRef}>
          <ModalContent>
            <div>
              <h2>Subscribe to Our Service</h2>

              <FlexContainer>
                <CustomSelect
                  value={selectedOrg?.id || ''}
                  label={selectedOrg?.label || ''}
                  items={organizationItems}
                  onChange={(event) => handleOrgSelect(event.target.value as string)}
                  width='40%'
                />

                <MultiSelect
                  label="Select Users"
                  items={userItems}
                  selectedItems={selectedUsersIds}
                  onChange={handleUsersSelect}
                  width='40%'
                />
              </FlexContainer>
            </div>
            <div>

              {/* Since Custom components in use, I've decided to use custom submit instead of the html form approach */}
              <SubmitButton
                onClick={handleSubmit}
                disabled={!selectedOrg || selectedUsersIds.length === 0}
              >
                Submit
              </SubmitButton>
            </div>

          </ModalContent>

        </Modal>
      )}
    </SubscribePageContainer>
  );
};

export default SubscribePage;
