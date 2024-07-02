// contracts/Acte.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Acte {
    enum Type {
        Mariage,
        Naissance,
        Deces
    }
    enum Status {
        EnAttente,
        Valide,
        Rejete
    }

    struct ActeStruct {
        uint id;
        string numacte;
        string cnipere;
        string cnimere;
        string cnitemoin1;
        string cnitemoin2;
        string dateetablissementacte;
        uint idregistre;
        uint idformation;
        Type acteType;
        Status status;
        address createdBy;
    }

    ActeStruct[] public actes;
    uint public nextId = 1;

    event ActeCreated(uint id, string numacte, address createdBy);
    event ActeUpdated(uint id, string numacte, Status status);

    function createActe(
        string memory numacte,
        string memory cnipere,
        string memory cnimere,
        string memory cnitemoin1,
        string memory cnitemoin2,
        string memory dateetablissementacte,
        uint idregistre,
        uint idformation,
        Type acteType
    ) public {
        actes.push(
            ActeStruct(
                nextId,
                numacte,
                cnipere,
                cnimere,
                cnitemoin1,
                cnitemoin2,
                dateetablissementacte,
                idregistre,
                idformation,
                acteType,
                Status.EnAttente,
                msg.sender
            )
        );
        emit ActeCreated(nextId, numacte, msg.sender);
        nextId++;
    }

    function updateStatus(uint id, Status status) public {
        for (uint i = 0; i < actes.length; i++) {
            if (actes[i].id == id) {
                actes[i].status = status;
                emit ActeUpdated(id, actes[i].numacte, status);
                return;
            }
        }
        revert("Acte not found");
    }

    function getActe(uint id) public view returns (ActeStruct memory) {
        for (uint i = 0; i < actes.length; i++) {
            if (actes[i].id == id) {
                return actes[i];
            }
        }
        revert("Acte not found");
    }
}
