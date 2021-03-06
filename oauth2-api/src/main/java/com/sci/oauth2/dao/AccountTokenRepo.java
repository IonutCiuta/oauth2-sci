package com.sci.oauth2.dao;

import com.sci.oauth2.model.AccountToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * ionutciuta24@gmail.com on 07.01.2018.
 */
@Repository
public interface AccountTokenRepo extends MongoRepository<AccountToken, String> {
    AccountToken findByTokenToken(String token);
    AccountToken findByAccountId(String accoundId);
}
